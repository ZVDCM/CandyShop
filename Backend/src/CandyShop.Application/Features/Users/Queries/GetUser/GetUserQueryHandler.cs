using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.Entities.Users.Errors;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Users.Queries.GetUser;

public sealed class GetUserQueryHandler : IRequestHandler<GetUserQuery, Result<User>>
{
    private readonly IUserRepository _userRepository;

    public GetUserQueryHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<Result<User>> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserAsync(cancellationToken);
        if (user is null) return Result<User>.Failure(new UserNotFound());
        return Result<User>.Success(user);
    }
}
