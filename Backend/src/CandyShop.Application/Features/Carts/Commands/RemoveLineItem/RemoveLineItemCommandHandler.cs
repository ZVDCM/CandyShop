using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Entities.Carts.Errors;
using CandyShop.Domain.Interfaces;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Carts.Commands.RemoveLineItem;

public sealed class RemoveLineItemCommandHandler : IRequestHandler<RemoveLineItemCommand, Result<Cart>>
{
    private readonly ICartRepository _cartRepository;
    private readonly IUnitOfWork _unitOfWork;

    public RemoveLineItemCommandHandler(ICartRepository cartRepository, IUnitOfWork unitOfWork)
    {
        _cartRepository = cartRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Cart>> Handle(RemoveLineItemCommand request, CancellationToken cancellationToken)
    {
        var cart = await _cartRepository.GetCartAsync(cancellationToken);
        if (cart is null) return Result<Cart>.Failure(new CartNotFound());

        var lineItem = cart.GetLineItem(request.LineItemId);
        if (lineItem is null) return Result<Cart>.Success(cart);

        cart.RemoveLineItem(lineItem);

        await _unitOfWork.SaveChangesAsync(cancellationToken);
        
        return Result<Cart>.Success(cart);
    }
}