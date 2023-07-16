using System;
using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Entities.Carts.Errors;

public sealed record CartNotFound() : IError
{
    public string Code => "Cart.NotFound";
    public string Message => "Cart is not Found";
}