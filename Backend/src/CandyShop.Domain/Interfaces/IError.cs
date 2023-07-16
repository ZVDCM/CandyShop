namespace CandyShop.Domain.Interfaces;

public interface IError
{
    string Code { get; }
    string Message { get; }
}