using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Candies.Queries.GetCandy;

public sealed record GetCandyQuery(CandyId CandyId) : IRequest<Result<Candy>>;