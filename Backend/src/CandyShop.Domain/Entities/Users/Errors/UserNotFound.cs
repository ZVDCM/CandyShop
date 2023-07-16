using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Entities.Users.Errors;

public sealed record UserNotFound() : IError
{
    public string Code => "User.NotFound";
    public string Message => "User is not found";
}