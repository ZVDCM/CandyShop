using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Shared.Results;

public class Result
{
    public bool IsSuccess { get; private set; }
    public IError? Error { get; private set; }

    protected Result(bool isSuccess, IError? error = null)
    {
        IsSuccess = isSuccess;
        Error = error;
    }

    public static Result Success() => new(true);
    public static Result Failure(IError error) => new(false, error);
}