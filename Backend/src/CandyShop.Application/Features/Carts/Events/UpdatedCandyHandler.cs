using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Candies.Events;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace CandyShop.Application.Features.Carts.Events;

public sealed class UpdatedCandyHandler : INotificationHandler<UpdatedCandy>
{
    private readonly ICartRepository _cartRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger _logger;

    public UpdatedCandyHandler(ICartRepository cartRepository, IUnitOfWork unitOfWork, ILogger<UpdatedCandyHandler> logger)
    {
        _cartRepository = cartRepository;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task Handle(UpdatedCandy notification, CancellationToken cancellationToken)
    {
        var cart = await _cartRepository.GetCartAsync(cancellationToken);
        if (cart is null)
        {
            _logger.LogError("Cart not found");
            return;
        }

        var lineItem = cart.GetLineItem(notification.Candy.Id);
        if (lineItem is null)
        {
            _logger.LogError("Line item not found");
            return;
        }

        if (lineItem.Quantity > notification.Candy.Quantity)
        {
            lineItem.DisableLineItem();
            cart.DeductLineItemPrice(lineItem);
        }
        else
        {
            lineItem.UpdateCandy(notification.Candy);
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}
