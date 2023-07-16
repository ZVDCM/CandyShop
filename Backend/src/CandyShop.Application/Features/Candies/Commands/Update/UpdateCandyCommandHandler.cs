using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Candies.Errors;
using CandyShop.Domain.Interfaces;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Candies.Commands.Update;

public sealed class UpdateCandyCommandHandler : IRequestHandler<UpdateCandyCommand, Result<Candy>>
{
    private readonly ICandyRepository _candyRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateCandyCommandHandler(ICandyRepository candyRepository, IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
        _candyRepository = candyRepository;
    }

    public async Task<Result<Candy>> Handle(UpdateCandyCommand request, CancellationToken cancellationToken)
    {
        var candy = await _candyRepository.GetCandyAsync(request.CandyId, cancellationToken);
        if (candy is null) return Result<Candy>.Failure(new CandyNotFound());
        candy.Update(request.Name, request.Quantity, request.Image, request.Price);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return Result<Candy>.Success(candy);
    }
}