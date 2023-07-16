using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CandyShop.Application.Interfaces;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Entities.Carts.Errors;
using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.Entities.Users.Errors;
using CandyShop.Domain.Interfaces;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Carts.Commands.CheckOutCart;

public sealed class CheckOutCartCommandHandler : IRequestHandler<CheckOutCartCommand, Result<(Cart, IEnumerable<Candy>)>>
{
    private readonly IUserRepository _userRepository;
    private readonly ICandyRepository _candyRepository;
    private readonly ICartRepository _cartRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IEmailSender _emailSender;

    public CheckOutCartCommandHandler(IUserRepository userRepository, ICandyRepository candyRepository, ICartRepository cartRepository, IUnitOfWork unitOfWork, IEmailSender emailSender)
    {
        _userRepository = userRepository;
        _candyRepository = candyRepository;
        _cartRepository = cartRepository;
        _unitOfWork = unitOfWork;
        _emailSender = emailSender;
    }

    public async Task<Result<(Cart, IEnumerable<Candy>)>> Handle(CheckOutCartCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserAsync(cancellationToken);
        if (user is null) return Result<(Cart, IEnumerable<Candy>)>.Failure(new UserNotFound());

        var cart = await _cartRepository.GetCartAsync(cancellationToken);
        if (cart is null) return Result<(Cart, IEnumerable<Candy>)>.Failure(new CartNotFound());
        if (!cart.LineItems.Any()) return Result<(Cart, IEnumerable<Candy>)>.Failure(new CartEmpty());

        var items = "";

        foreach (var item in cart.LineItems)
        {
            items += @$"
            <tr>
                <td style='border:1px solid'>{item.CandyName}</td>
                <td style='border:1px solid'>{item.Price.Currency} {item.Price.Value}</td>
                <td style='border:1px solid'>{item.Quantity}</td>
            </tr>
            ";
        }

        var emailBody = @$"
            <h1>Your Order</h1>
            <p>Name: {user.Name}</p>
            <p>Address: {user.Address}</p>
            <p>Total Price: {cart.TotalPrice.Currency} {cart.TotalPrice.Value}</p>
            <table style='width:500px;border:1px solid'>
                <thead>
                    <tr>
                        <th style='border:1px solid'>Candy</th>
                        <th style='border:1px solid'>Price</th>
                        <th style='border:1px solid'>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
            ";

        var IsSuccess = await _emailSender.SendEmailAsync(user.Email, "Candy Shop", emailBody, cancellationToken);
        if (!IsSuccess) return Result<(Cart, IEnumerable<Candy>)>.Failure(new UserInvalidEmail());

        cart.CheckOutCart();

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var candies = await _candyRepository.GetAllCandiesAsync(cancellationToken);

        return Result<(Cart, IEnumerable<Candy>)>.Success((cart, candies));
    }
}
