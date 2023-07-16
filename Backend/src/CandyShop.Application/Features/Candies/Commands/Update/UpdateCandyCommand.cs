using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Shared.Results;
using CandyShop.Domain.ValueObjects;
using MediatR;

namespace CandyShop.Application.Features.Candies.Commands.Update;

public sealed record UpdateCandyCommand(
    CandyId CandyId,
    string Name,
    int Quantity,
    string Image,
    Money Price) : IRequest<Result<Candy>>;