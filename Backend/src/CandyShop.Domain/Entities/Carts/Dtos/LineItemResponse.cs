using System;
using CandyShop.Domain.ValueObjects;

namespace CandyShop.Domain.Entities.Carts.Dtos;

public sealed record LineItemResponse(
    Guid Id,
    Guid? CandyId,
    string CandyName,
    int CandyQuantity,
    string CandyImage,
    Money CandyPrice,
    int Quantity,
    Money Price,
    bool IsDisabled);