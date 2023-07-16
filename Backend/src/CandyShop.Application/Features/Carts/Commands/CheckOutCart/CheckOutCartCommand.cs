using System.Collections.Generic;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Carts.Commands.CheckOutCart;

public sealed record CheckOutCartCommand() : IRequest<Result<(Cart, IEnumerable<Candy>)>>;