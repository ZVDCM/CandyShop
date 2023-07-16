using System;

namespace CandyShop.Domain.Entities.Carts.Dtos;

public sealed record RemoveCandyToCartRequest(Guid CandyId);