using System;

namespace CandyShop.Domain.Entities.Users.Dtos;

public sealed record UserResponse(Guid Id, string Name, string Email, string Address);