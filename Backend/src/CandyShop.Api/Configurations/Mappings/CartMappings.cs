using System.Linq;
using CandyShop.Application.Features.Carts.Commands.AddCandy;
using CandyShop.Application.Features.Carts.Commands.RemoveCandy;
using CandyShop.Application.Features.Carts.Commands.RemoveLineItem;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Entities.Carts.Dtos;
using CandyShop.Domain.Entities.Carts.LineItems;
using Mapster;

namespace CandyShop.Api.Configurations.Mappings;

public sealed class CartMappings : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<AddCandyToCartRequest, AddCandyCommand>()
            .MapWith(r => new AddCandyCommand(
                new CandyId(r.CandyId),
                r.Quantity));
        config.NewConfig<RemoveCandyToCartRequest, RemoveCandyCommand>()
            .MapWith(r => new RemoveCandyCommand(new CandyId(r.CandyId)));
        config.NewConfig<RemoveLineItemFromCartRequest, RemoveLineItemCommand>()
            .MapWith(r => new RemoveLineItemCommand(new LineItemId(r.LineItemId)));
        config.NewConfig<Cart, CartResponse>()
            .MapWith(c => new CartResponse(
                c.Id.Value,
                c.UserId.Value,
                c.UserName,
                c.UserEmail,
                c.UserAddress,
                c.TotalPrice,
                c.LineItems.Select(l => new LineItemResponse(
                    l.Id.Value,
                    l.CandyId != null ? l.CandyId.Value : null,
                    l.CandyName,
                    l.CandyQuantity,
                    l.CandyImage,
                    l.CandyPrice,
                    l.Quantity,
                    l.Price,
                    l.IsDisabled))
            ));
    }
}