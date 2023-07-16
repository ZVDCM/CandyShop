using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Entities.Candies.Events;

public sealed record DeletedCandy(Candy Candy) : IDomainEvent;