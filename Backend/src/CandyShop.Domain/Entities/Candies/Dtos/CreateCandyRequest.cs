using CandyShop.Domain.ValueObjects;

namespace CandyShop.Domain.Entities.Candies.Dtos;

public sealed record CreateCandyRequest(string Name, int Quantity, string Image, Money Price);