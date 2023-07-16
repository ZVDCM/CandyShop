using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Users.Commands.Update;

public sealed record UpdateUserCommand(string Name, string Email, string Address) : IRequest<Result<User>>;