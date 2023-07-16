using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Shared.Results;

public class Result<T> : Result
{
    private readonly T _value;
    public T Value => _value;

    protected internal Result(T value, bool isSuccess, IError? error = null) : base(isSuccess, error)
    {
        _value = value;
    }

    public static Result<T> Success(T value) => new(value, true, null);
    public static new Result<T> Failure(IError error) => new(default!, false, error);
}