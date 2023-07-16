using CandyShop.Domain.Entities.Candies;
using FluentValidation;

namespace CandyShop.Application.Features.Candies.Commands.Update;

public sealed class UpdateCandyCommandValidator : AbstractValidator<UpdateCandyCommand>
{
    public UpdateCandyCommandValidator()
    {
        RuleFor(x => x.CandyId).NotEmpty();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(Candy.CandyNameMaxLength);
        RuleFor(x => x.Quantity).NotEmpty();
        RuleFor(x => x.Image).NotEmpty();
        RuleFor(x => x.Price).NotEmpty();
    }
}