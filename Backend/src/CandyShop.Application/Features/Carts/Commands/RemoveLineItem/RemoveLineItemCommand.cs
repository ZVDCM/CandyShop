using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Entities.Carts.LineItems;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Carts.Commands.RemoveLineItem;

public sealed record RemoveLineItemCommand(LineItemId LineItemId) : IRequest<Result<Cart>>;
