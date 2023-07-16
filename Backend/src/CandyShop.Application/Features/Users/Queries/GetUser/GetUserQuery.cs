using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Users.Queries.GetUser;

public sealed record GetUserQuery() : IRequest<Result<User>>;