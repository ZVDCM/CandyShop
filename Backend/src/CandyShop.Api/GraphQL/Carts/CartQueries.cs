using System.Threading;
using System.Threading.Tasks;
using CandyShop.Api.Errors;
using CandyShop.Application.Features.Carts.Queries.GetCart;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Entities.Carts.Dtos;
using CandyShop.Domain.Shared.Results;
using HotChocolate;
using HotChocolate.Types;
using MapsterMapper;
using MediatR;

namespace CandyShop.Api.GraphQL.Carts;

[QueryType]
public sealed class CartQueries
{
    public async Task<CartResponse> GetCartAsync(
        [Service] IMapper mapper,
        [Service] ISender sender,
        CancellationToken token)
    {
        Result<Cart> result = await sender.Send(new GetCartQuery(), token);
        if (!result.IsSuccess) result.HandleException();
        var response = mapper.Map<CartResponse>(result.Value!);
        return response;
    }
}