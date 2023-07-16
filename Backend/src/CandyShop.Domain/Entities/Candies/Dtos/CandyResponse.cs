using System;
using CandyShop.Domain.ValueObjects;

namespace CandyShop.Domain.Entities.Candies.Dtos;

public sealed record CandyResponse(Guid Id, string Name, int Quantity, string Image, Money Price);