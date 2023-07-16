using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CandyShop.Api.Errors;
using CandyShop.Application.Features.Candies.Queries.GetAllCandies;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Candies.Dtos;
using CandyShop.Domain.Entities.Carts.Dtos;
using CandyShop.Domain.Shared.Results;
using HotChocolate;
using HotChocolate.Types;
using MapsterMapper;
using MediatR;

namespace CandyShop.Api.GraphQL.Carts;

[SubscriptionType]
public sealed class CartSubscriptions
{
    [Subscribe]
    [Topic(nameof(CartMutations.CheckOutCartAsync))]
    public IEnumerable<CandyResponse> OnCheckOutCart(
        [EventMessage] IEnumerable<CandyResponse> response)
        => response;
}