using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Entities.Candies.Errors;

public sealed record CandyOutOfStock(string CandyName, int CandyQuantity) : IError
{
    public string Code => "Candy.OutOfStock";
    public string Message => $"Only {CandyQuantity} of {CandyName} are available";
}