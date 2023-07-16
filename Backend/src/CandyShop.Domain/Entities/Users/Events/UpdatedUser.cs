using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Entities.Users.Events;

public sealed record UpdatedUser(User User) : IDomainEvent;