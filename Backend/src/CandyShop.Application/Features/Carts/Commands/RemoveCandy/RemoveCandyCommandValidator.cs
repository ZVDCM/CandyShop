using FluentValidation;

namespace CandyShop.Application.Features.Carts.Commands.RemoveCandy;

public sealed class RemoveCandyCommandValidator : AbstractValidator<RemoveCandyCommand>
{
    public RemoveCandyCommandValidator()
    {
        RuleFor(x => x.CandyId).NotEmpty();
    }
}