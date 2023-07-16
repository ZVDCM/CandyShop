using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.Entities.Users.Errors;
using CandyShop.Domain.Interfaces;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Users.Commands.Update;

public sealed class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, Result<User>>
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateUserCommandHandler(IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<User>> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserAsync(cancellationToken);
        if (user is null) return Result<User>.Failure(new UserNotFound());
        user.Update(request.Name, request.Email, request.Address);
        await _unitOfWork.SaveChangesAsync(cancellationToken);
        return Result<User>.Success(user);
    }
}