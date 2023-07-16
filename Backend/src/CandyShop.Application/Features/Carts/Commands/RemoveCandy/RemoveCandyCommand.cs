using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Carts.Commands.RemoveCandy;

public sealed record RemoveCandyCommand(CandyId CandyId) : IRequest<Result<Cart>>;