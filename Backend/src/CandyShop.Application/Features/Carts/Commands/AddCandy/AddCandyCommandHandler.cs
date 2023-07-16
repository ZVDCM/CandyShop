using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Candies.Errors;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Entities.Carts.Errors;
using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.Entities.Users.Errors;
using CandyShop.Domain.Interfaces;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Carts.Commands.AddCandy;

public sealed class AddCandyCommandHandler : IRequestHandler<AddCandyCommand, Result<Cart>>
{
    private readonly ICartRepository _cartRepository;
    private readonly ICandyRepository _candyRepository;
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public AddCandyCommandHandler(ICartRepository cartRepository, ICandyRepository candyRepository, IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _cartRepository = cartRepository;
        _candyRepository = candyRepository;
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Cart>> Handle(AddCandyCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserAsync(cancellationToken);
        if (user is null) return Result<Cart>.Failure(new UserNotFound());

        var cart = await _cartRepository.GetCartAsync(cancellationToken);
        if (cart is null) return Result<Cart>.Failure(new CartNotFound());

        var candy = await _candyRepository.GetCandyAsync(request.CandyId, cancellationToken);
        if (candy is null) return Result<Cart>.Failure(new CandyNotFound());

        if (request.Quantity > candy.Quantity) return Result<Cart>.Failure(new CandyOutOfStock(candy.Name, candy.Quantity));

        var lineItem = cart.GetLineItem(candy.Id);
        if (lineItem is not null)
        {
            var difference = candy.Quantity - (lineItem.Quantity + request.Quantity);
            if (difference < 0) return Result<Cart>.Failure(new CandyOutOfStock(candy.Name, candy.Quantity));
        }

        cart.AddCandy(candy, request.Quantity);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result<Cart>.Success(cart);
    }
}