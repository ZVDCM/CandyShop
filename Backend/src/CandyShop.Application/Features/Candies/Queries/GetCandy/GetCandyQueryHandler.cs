using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Candies.Errors;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Candies.Queries.GetCandy;

public sealed class GetCandyQueryHandler : IRequestHandler<GetCandyQuery, Result<Candy>>
{
    private readonly ICandyRepository _candyRepository;

    public GetCandyQueryHandler(ICandyRepository candyRepository)
    {
        _candyRepository = candyRepository;
    }

    public async Task<Result<Candy>> Handle(GetCandyQuery request, CancellationToken cancellationToken)
    {
        var candy = await _candyRepository.GetCandyAsync(request.CandyId, cancellationToken);
        if (candy is null) return Result<Candy>.Failure(new CandyNotFound());
        return Result<Candy>.Success(candy);
    }
}