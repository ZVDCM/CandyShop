using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CandyShop.Api.Errors;
using CandyShop.Application.Features.Carts.Commands.AddCandy;
using CandyShop.Application.Features.Carts.Commands.CheckOutCart;
using CandyShop.Application.Features.Carts.Commands.RemoveCandy;
using CandyShop.Application.Features.Carts.Commands.RemoveLineItem;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Candies.Dtos;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Entities.Carts.Dtos;
using CandyShop.Domain.Entities.Users.Dtos;
using CandyShop.Domain.Shared.Results;
using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using MapsterMapper;
using MediatR;

namespace CandyShop.Api.GraphQL.Carts;

[MutationType]
public sealed class CartMutations
{
    public async Task<CartResponse> AddCandyToCartAsync(
        AddCandyToCartRequest request,
        [Service] IMapper mapper,
        [Service] ISender sender,
        CancellationToken token)
    {
        var command = mapper.Map<AddCandyCommand>(request);
        Result<Cart> result = await sender.Send(command, token);
        if (!result.IsSuccess) result.HandleException();
        return MapToCartResponse(mapper, result.Value!);
    }

    public async Task<CartResponse> RemoveCandyFromCartAsync(
        RemoveCandyToCartRequest request,
        [Service] IMapper mapper,
        [Service] ISender sender,
        CancellationToken token)
    {
        var command = mapper.Map<RemoveCandyCommand>(request);
        Result<Cart> result = await sender.Send(command, token);
        if (!result.IsSuccess) result.HandleException();
        return MapToCartResponse(mapper, result.Value!);
    }

    public async Task<CartResponse> RemoveLineItemFromCartAsync(
        RemoveLineItemFromCartRequest request,
        [Service] IMapper mapper,
        [Service] ISender sender,
        CancellationToken token)
    {
        var command = mapper.Map<RemoveLineItemCommand>(request);
        Result<Cart> result = await sender.Send(command, token);
        if (!result.IsSuccess) result.HandleException();
        return MapToCartResponse(mapper, result.Value!);
    }

    public async Task<CartResponse> CheckOutCartAsync(
        [Service] IMapper mapper,
        [Service] ISender sender,
        [Service] ITopicEventSender eventSender,
        CancellationToken token)
    {
        Result<(Cart, IEnumerable<Candy>)> result = await sender.Send(new CheckOutCartCommand(), token);
        if (!result.IsSuccess) result.HandleException();
        await eventSender.SendAsync(nameof(CheckOutCartAsync), result.Value.Item2!.Select(mapper.Map<CandyResponse>), token);
        return MapToCartResponse(mapper, result.Value.Item1!);
    }

    private static CartResponse MapToCartResponse(IMapper mapper, Cart cart)
    {
        var response = mapper.Map<CartResponse>(cart);
        return response;
    }
}