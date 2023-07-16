using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CandyShop.Api.Errors;
using CandyShop.Application.Features.Candies.Queries.GetAllCandies;
using CandyShop.Application.Features.Candies.Queries.GetCandy;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Candies.Dtos;
using CandyShop.Domain.Shared.Results;
using HotChocolate;
using HotChocolate.Types;
using MapsterMapper;
using MediatR;

namespace CandyShop.Api.GraphQL.Candies;

[QueryType]
public sealed class CandyQueries
{
    public async Task<IEnumerable<CandyResponse>> GetAllCandiesAsync(
        [Service] IMapper mapper,
        [Service] ISender sender,
        CancellationToken token)
    {
        Result<IEnumerable<Candy>> result = await sender.Send(new GetAllCandiesQuery(), token);
        if(!result.IsSuccess) result.HandleException();
        var response = result.Value!.Select(mapper.Map<CandyResponse>);
        return response;
    }

    public async Task<CandyResponse> GetCandyAsync(
        Guid id,
        [Service] IMapper mapper,
        [Service] ISender sender,
        CancellationToken token)
    {
        var query = mapper.Map<GetCandyQuery>(id);
        Result<Candy> result = await sender.Send(query, token);
        if(!result.IsSuccess) result.HandleException();
        var response = mapper.Map<CandyResponse>(result.Value!);
        return response;
    }
}