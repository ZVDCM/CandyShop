using FluentValidation;

namespace CandyShop.Application.Features.Carts.Commands.RemoveLineItem;

public sealed class RemoveLineItemCommandValidator : AbstractValidator<RemoveLineItemCommand>
{
    public RemoveLineItemCommandValidator()
    {
        RuleFor(x => x.LineItemId).NotEmpty();
    }
}
