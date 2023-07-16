using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Shared.Errors;

public sealed record Error(string ErrorCode, string ErrorMessage) : IError
{
    public string Code => ErrorCode;
    public string Message => ErrorMessage;
}