using System;
using System.Collections.Generic;
using CandyShop.Domain.Interfaces;
using CandyShop.Domain.Shared.Results;
using HotChocolate;

namespace CandyShop.Api.Errors;

public static class GraphQLExceptionExtension
{
    public static object HandleException(this Result result)
    => result switch
    {
        { IsSuccess: true } => throw new Exception("Invalid use case"),
        IValidationResult validationResult => throw new GraphQLException(SetError(validationResult.Errors)),
        _ => throw new GraphQLException(ErrorBuilder.New().SetCode(result.Error!.Code).SetMessage(result.Error!.Message).Build()),
    };

    private static HotChocolate.IError SetError(List<Domain.Shared.Errors.Error> errors)
    {
        var errorBuilder = ErrorBuilder.New()
            .SetCode(IValidationResult.ValidationError.Code)
            .SetMessage(IValidationResult.ValidationError.Message);

        Dictionary<string, string> validationErrors = new();

        foreach (var error in errors)
        {
            if (validationErrors.ContainsKey(error.Code))
            {
                validationErrors[error.Code] = $"{validationErrors[error.Code]} {error.Message}";
                continue;
            }
            validationErrors[error.Code] = error.Message;
        }

        foreach (var errorKey in validationErrors.Keys)
        {
            errorBuilder.SetExtension(errorKey, validationErrors[errorKey]);
        }

        return errorBuilder.Build();
    }
}