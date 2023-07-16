namespace CandyShop.Domain.Interfaces;

public interface IValidationError
{
    string PropertyName { get; }
    string Message { get; }
}