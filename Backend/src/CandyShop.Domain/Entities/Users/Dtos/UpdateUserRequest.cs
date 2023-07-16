using System;

namespace CandyShop.Domain.Entities.Users.Dtos;

public sealed record UpdateUserRequest(string Name, string Email, string Address);