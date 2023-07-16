using FluentValidation;

namespace CandyShop.Application.Features.Candies.Queries.GetCandy;

public sealed class GetCandyQueryValidator:AbstractValidator<GetCandyQuery>
{
    public GetCandyQueryValidator()
    {
        RuleFor(x => x.CandyId).NotEmpty();
    }
}