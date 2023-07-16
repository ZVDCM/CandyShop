using System.Collections.Generic;
using CandyShop.Domain.Interfaces;
using CandyShop.Domain.Shared.Errors;
using CandyShop.Domain.Shared.Results;

namespace CandyShop.Domain.Shared.Validations;

public sealed class ValidationResult : Result, IValidationResult
{
    public List<Error> Errors { get; private set; }
    private ValidationResult(List<Error> errors) : base(
        false,
        IValidationResult.ValidationError)
    {
        Errors = errors;
    }

    public static ValidationResult Failure(List<Error> errors) => new(errors);
}