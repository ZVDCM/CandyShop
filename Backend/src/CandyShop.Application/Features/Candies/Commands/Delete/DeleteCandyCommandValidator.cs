using FluentValidation;

namespace CandyShop.Application.Features.Candies.Commands.Delete;

public sealed class DeleteCandyCommandValidator:AbstractValidator<DeleteCandyCommand>
{
    public DeleteCandyCommandValidator()
    {
        RuleFor(x => x.CandyId).NotEmpty();
    }
}