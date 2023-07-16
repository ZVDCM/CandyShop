using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Interfaces;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Candies.Commands.Create;

public sealed class CreateCandyCommandHandler : IRequestHandler<CreateCandyCommand, Result<Candy>>
{
    private readonly ICandyRepository _candyRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateCandyCommandHandler(ICandyRepository candyRepository, IUnitOfWork unitOfWork)
    {
        _candyRepository = candyRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Candy>> Handle(CreateCandyCommand request, CancellationToken cancellationToken)
    {
        var candy = await _candyRepository.AddCandyAsync(request.Candy, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return Result<Candy>.Success(candy);
    }
}