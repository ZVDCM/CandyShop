using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Entities.Users.Errors;

public sealed record UserInvalidEmail() : IError
{
    public string Code => "User.InvalidEmail";
    public string Message => "User email is invalid";
}