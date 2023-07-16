using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Entities.Candies.Errors;

public sealed record CandyNotFound() : IError
{
    public string Code => "Candy.NotFound";
    public string Message => "Candy is not found";
}