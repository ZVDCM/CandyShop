using FluentValidation;

namespace CandyShop.Application.Features.Candies.Commands.Create;

public sealed class CreateCandyCommandValidator : AbstractValidator<CreateCandyCommand>
{
    public CreateCandyCommandValidator()
    {
        RuleFor(x => x.Candy).NotEmpty();
    }
}