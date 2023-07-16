using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Entities.Carts.Errors;
using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.Entities.Users.Errors;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Carts.Queries.GetCart;

public sealed class GetCartQueryHandler : IRequestHandler<GetCartQuery, Result<Cart>>
{
    private readonly ICartRepository _cartRepository;

    public GetCartQueryHandler(ICartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }

    public async Task<Result<Cart>> Handle(GetCartQuery request, CancellationToken cancellationToken)
    {
        var cart = await _cartRepository.GetCartAsync(cancellationToken);
        if(cart is null) return Result<Cart>.Failure(new CartNotFound());
        return Result<Cart>.Success(cart);
    }
}
