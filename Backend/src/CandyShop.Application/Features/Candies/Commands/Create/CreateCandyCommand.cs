using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Candies.Commands.Create;

public sealed record CreateCandyCommand(Candy Candy) : IRequest<Result<Candy>>;