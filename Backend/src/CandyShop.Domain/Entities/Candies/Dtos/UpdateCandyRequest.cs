using CandyShop.Domain.ValueObjects;

namespace CandyShop.Domain.Entities.Candies.Dtos;

public sealed record UpdateCandyRequest(string Name, int Quantity, string Image, Money Price);