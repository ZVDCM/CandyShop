using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Candies.Queries.GetAllCandies;

public sealed class GetAllCandiesQueryHandler : IRequestHandler<GetAllCandiesQuery, Result<IEnumerable<Candy>>>
{
    private readonly ICandyRepository _candyRepository;

    public GetAllCandiesQueryHandler(ICandyRepository candyRepository)
    {
        _candyRepository = candyRepository;
    }

    public async Task<Result<IEnumerable<Candy>>> Handle(GetAllCandiesQuery request, CancellationToken cancellationToken)
    {
        var candies = await _candyRepository.GetAllCandiesAsync(cancellationToken);
        return Result<IEnumerable<Candy>>.Success(candies);
    }
}