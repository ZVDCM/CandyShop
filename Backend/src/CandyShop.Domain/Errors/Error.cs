using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Errors;

public sealed class Error: IError{
    private string ErrorCode { get; set; } = string.Empty;
    private string ErrorMessage { get; set; } = string.Empty;
    public string Code => ErrorCode;
    public string Message => ErrorMessage;

    public Error(string code, string message){
        ErrorCode = code;
        ErrorMessage = message;
    }
}