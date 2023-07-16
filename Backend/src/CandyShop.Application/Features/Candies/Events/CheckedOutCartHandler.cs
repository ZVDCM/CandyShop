using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Carts.Events;
using CandyShop.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace CandyShop.Application.Features.Candies.Events;

public sealed class CheckedOutCartHandler : INotificationHandler<CheckedOutCart>
{
    private readonly ICandyRepository _candyRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger _logger;

    public CheckedOutCartHandler(ICandyRepository candyRepository, IUnitOfWork unitOfWork, ILogger<CheckedOutCartHandler> logger)
    {
        _candyRepository = candyRepository;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task Handle(CheckedOutCart notification, CancellationToken cancellationToken)
    {
        foreach (var lineItem in notification.Cart.LineItems)
        {
            if (lineItem.IsDisabled) continue;
            var candy = await _candyRepository.GetCandyAsync(lineItem.CandyId!, cancellationToken);
            if (candy is null)
            {
                _logger.LogError("Candy not found");
                continue;
            }

            var difference = candy.Quantity - lineItem.Quantity;
            candy.UpdateQuantity(difference);
        }

        notification.Cart.ClearLineItems();
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}
