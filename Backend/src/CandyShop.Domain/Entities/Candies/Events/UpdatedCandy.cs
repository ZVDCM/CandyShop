using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Entities.Candies.Events;

public sealed record UpdatedCandy(Candy Candy) : IDomainEvent;