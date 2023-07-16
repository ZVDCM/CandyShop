using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Shared;

public sealed class ValidationError : IValidationError
{
    private string ErrorPropertyName { get; set; }
    private string ErrorMessage { get; set; }
    public string PropertyName => ErrorPropertyName;
    public string Message => ErrorMessage;

    public ValidationError(string propertyName, string message)
    {
        ErrorPropertyName = propertyName;
        ErrorMessage = message;
    }
}