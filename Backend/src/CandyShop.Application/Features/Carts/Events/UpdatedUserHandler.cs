using System;
using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Entities.Carts.Errors;
using CandyShop.Domain.Entities.Users.Events;
using CandyShop.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace CandyShop.Application.Features.Carts.Events;

public sealed class UpdatedUserHandler : INotificationHandler<UpdatedUser>
{
    private readonly ICartRepository _cartRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger _logger;

    public UpdatedUserHandler(ICartRepository cartRepository, IUnitOfWork unitOfWork, ILogger<UpdatedUserHandler> logger)
    {
        _cartRepository = cartRepository;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task Handle(UpdatedUser notification, CancellationToken cancellationToken)
    {
        var cart = await _cartRepository.GetCartAsync(cancellationToken);
        if (cart is null)
        {
            _logger.LogError("Cart not found");
            return;
        }

        cart.UpdateUser(notification.User);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}