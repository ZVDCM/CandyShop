using System.Threading;
using System.Threading.Tasks;
using CandyShop.Api.Errors;
using CandyShop.Application.Features.Users.Commands.Update;
using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.Entities.Users.Dtos;
using CandyShop.Domain.Shared.Results;
using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using MapsterMapper;
using MediatR;

namespace CandyShop.Api.GraphQL.Users;

[MutationType]
public sealed class UserMutations
{
    public async Task<UserResponse> UpdateUserAsync(
        UpdateUserRequest request,
        [Service] IMapper mapper,
        [Service] ISender sender,
        [Service] ITopicEventSender eventSender,
        CancellationToken token)
    {
        var command = mapper.Map<UpdateUserCommand>(request);
        Result<User> result = await sender.Send(command, token);
        if (!result.IsSuccess) result.HandleException();
        var response = mapper.Map<UserResponse>(result.Value!);
        await eventSender.SendAsync(nameof(UpdateUserAsync), response, token);
        return response;
    }
}