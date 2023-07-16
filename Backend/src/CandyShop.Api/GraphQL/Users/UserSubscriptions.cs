using CandyShop.Domain.Entities.Users.Dtos;
using HotChocolate;
using HotChocolate.Types;

namespace CandyShop.Api.GraphQL.Users;

[SubscriptionType]
public sealed class UserSubscriptions
{

    [Subscribe]
    [Topic(nameof(UserMutations.UpdateUserAsync))]
    public UserResponse OnUserUpdated([EventMessage] UserResponse response)
        => response;
}