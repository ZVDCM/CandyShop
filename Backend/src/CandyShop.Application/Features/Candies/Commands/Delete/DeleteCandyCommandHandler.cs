using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Candies.Errors;
using CandyShop.Domain.Interfaces;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Candies.Commands.Delete;

public sealed class DeleteCandyCommandHandler : IRequestHandler<DeleteCandyCommand, Result<Candy>>
{
    private readonly ICandyRepository _candyRepository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteCandyCommandHandler(ICandyRepository candyRepository, IUnitOfWork unitOfWork)
    {
        _candyRepository = candyRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Candy>> Handle(DeleteCandyCommand request, CancellationToken cancellationToken)
    {
        var candy = await _candyRepository.GetCandyAsync(request.CandyId, cancellationToken);
        if (candy is null) return Result<Candy>.Failure(new CandyNotFound());
        candy.Remove();
        _candyRepository.RemoveCandy(candy);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return Result<Candy>.Success(candy);
    }
}