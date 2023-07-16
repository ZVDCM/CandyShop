using System.Threading;
using System.Threading.Tasks;
using CandyShop.Api.Errors;
using CandyShop.Application.Features.Users.Queries.GetUser;
using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.Entities.Users.Dtos;
using CandyShop.Domain.Shared.Results;
using HotChocolate;
using HotChocolate.Types;
using MapsterMapper;
using MediatR;

namespace CandyShop.Api.GraphQL.Users;

[QueryType]
public sealed class UserQueries
{
    public async Task<UserResponse> GetUserAsync(
        [Service] IMapper mapper,
        [Service] ISender sender,
        CancellationToken token)
    {
        Result<User> result = await sender.Send(new GetUserQuery(), token);
        if (!result.IsSuccess) result.HandleException();
        var response = mapper.Map<UserResponse>(result.Value!);
        return response;
    }
}