using FluentValidation;

namespace CandyShop.Application.Features.Carts.Commands.AddCandy;

public sealed class AddCandyCommandValidator : AbstractValidator<AddCandyCommand>
{
    public AddCandyCommandValidator()
    {
        RuleFor(x => x.CandyId).NotEmpty();
        RuleFor(x => x.Quantity).NotEmpty().GreaterThan(0);
    }
}