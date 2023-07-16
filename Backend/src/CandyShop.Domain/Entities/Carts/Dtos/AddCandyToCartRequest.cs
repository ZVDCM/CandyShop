using System;

namespace CandyShop.Domain.Entities.Carts.Dtos;

public sealed record AddCandyToCartRequest(Guid CandyId, int Quantity);