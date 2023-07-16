using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Entities.Carts.Events;

public sealed record CheckedOutCart(Cart Cart) : IDomainEvent;