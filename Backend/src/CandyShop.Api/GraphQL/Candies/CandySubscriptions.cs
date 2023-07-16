using CandyShop.Domain.Entities.Candies.Dtos;
using HotChocolate;
using HotChocolate.Types;

namespace CandyShop.Api.GraphQL.Candies;

[SubscriptionType]
public sealed class CandySubscriptions
{
    [Subscribe]
    [Topic(nameof(CandyMutations.UpdateCandyAsync))]
    public CandyResponse OnCandyUpdated([EventMessage] CandyResponse response)
        => response;

    [Subscribe]
    [Topic(nameof(CandyMutations.DeleteCandyAsync))]
    public CandyResponse OnCandyDeleted([EventMessage] CandyResponse response)
        => response;
}