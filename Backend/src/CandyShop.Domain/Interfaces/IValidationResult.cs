using System.Collections.Generic;
using CandyShop.Domain.Shared.Errors;

namespace CandyShop.Domain.Interfaces;

public interface IValidationResult{
    public static readonly Error ValidationError = new("ValidationError", "a validation problem occurred");
    List<Error> Errors { get; }
}