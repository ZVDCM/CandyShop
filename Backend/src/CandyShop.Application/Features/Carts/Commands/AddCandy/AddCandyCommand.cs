using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Carts.Commands.AddCandy;

public sealed record AddCandyCommand(CandyId CandyId, int Quantity) : IRequest<Result<Cart>>;