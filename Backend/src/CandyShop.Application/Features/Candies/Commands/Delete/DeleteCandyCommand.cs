using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Candies.Commands.Delete;

public sealed record DeleteCandyCommand(CandyId CandyId) : IRequest<Result<Candy>>;