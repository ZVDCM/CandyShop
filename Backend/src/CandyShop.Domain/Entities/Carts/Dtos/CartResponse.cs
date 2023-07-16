using System;
using System.Collections.Generic;
using CandyShop.Domain.ValueObjects;

namespace CandyShop.Domain.Entities.Carts.Dtos;

public sealed record CartResponse(
    Guid Id,
    Guid UserId,
    string UserName,
    string UserEmail,
    string UserAddress,
    Money TotalPrice,
    IEnumerable<LineItemResponse> LineItems);