using CandyShop.Domain.Entities.Users;
using FluentValidation;

namespace CandyShop.Application.Features.Users.Commands.Update;

public sealed class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
{
    public UpdateUserCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(User.UserNameMaxLength);
        RuleFor(x => x.Email).NotEmpty();
        RuleFor(x => x.Address).NotEmpty().MaximumLength(User.AddressMaxLength);
    }
}