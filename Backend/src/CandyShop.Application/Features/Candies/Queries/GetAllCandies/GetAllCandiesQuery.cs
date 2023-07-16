using System.Collections.Generic;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Candies.Queries.GetAllCandies;

public sealed record GetAllCandiesQuery() : IRequest<Result<IEnumerable<Candy>>>;