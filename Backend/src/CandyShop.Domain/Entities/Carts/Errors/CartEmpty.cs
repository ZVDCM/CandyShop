using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Entities.Carts.Errors;

public sealed record CartEmpty() : IError
{
    public string Code => "Cart.Empty";
    public string Message => "Cart is Empty";
}