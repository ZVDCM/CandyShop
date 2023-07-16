using CandyShop.Application.Features.Users.Commands.Update;
using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.Entities.Users.Dtos;
using Mapster;

namespace CandyShop.Api.Configurations.Mappings;

public sealed class UserMappings : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<User, UserResponse>()
            .MapWith(u => new UserResponse(u.Id.Value, u.Name, u.Email, u.Address));
        config.NewConfig<UpdateUserRequest, UpdateUserCommand>()
            .MapWith(r => new UpdateUserCommand(r.Name, r.Email, r.Address));
    }
}