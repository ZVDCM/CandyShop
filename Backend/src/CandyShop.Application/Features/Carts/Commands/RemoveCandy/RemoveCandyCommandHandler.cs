using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Candies.Errors;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Entities.Carts.Errors;
using CandyShop.Domain.Interfaces;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Carts.Commands.RemoveCandy;

public sealed class RemoveCandyCommandHandler : IRequestHandler<RemoveCandyCommand, Result<Cart>>
{
    private readonly ICartRepository _cartRepository;
    private readonly ICandyRepository _candyRepository;
    private readonly IUnitOfWork _unitOfWork;

    public RemoveCandyCommandHandler(
        ICartRepository cartRepository,
        ICandyRepository candyRepository,
        IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
        _candyRepository = candyRepository;
        _cartRepository = cartRepository;
    }

    public async Task<Result<Cart>> Handle(RemoveCandyCommand request, CancellationToken cancellationToken)
    {
        var cart = await _cartRepository.GetCartAsync(cancellationToken);
        if (cart is null) return Result<Cart>.Failure(new CartNotFound());

        var lineItem = cart.GetLineItem(request.CandyId);
        if (lineItem is null) return Result<Cart>.Success(cart);

        var candy = await _candyRepository.GetCandyAsync(request.CandyId, cancellationToken);
        if (candy is null)
        {
            cart.RemoveLineItem(lineItem);
            return Result<Cart>.Success(cart);
        };

        cart.RemoveCandy(candy);

        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return Result<Cart>.Success(cart);
    }
}
