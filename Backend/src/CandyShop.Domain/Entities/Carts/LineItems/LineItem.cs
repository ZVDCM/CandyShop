using System;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.ValueObjects;

namespace CandyShop.Domain.Entities.Carts.LineItems;

public sealed class LineItem
{
    public const int LineItemCandyNameMaxLength = 50;
    public LineItemId Id { get; private set; } = null!;
    public CandyId? CandyId { get; private set; } = null!;
    public string CandyName { get; private set; } = string.Empty;
    public int CandyQuantity { get; private set; } = 0;
    public string CandyImage { get; private set; } = string.Empty;
    public Money CandyPrice { get; private set; } = null!;
    public Money Price { get; private set; } = null!;
    public int Quantity { get; private set; } = 0;
    public bool IsDisabled { get; private set; } = false;

    private LineItem(
        Guid id,
        CandyId candyId,
        string candyName,
        int candyQuantity,
        string candyImage,
        Money candyPrice,
        int quantity)
    {
        Id = new LineItemId(id);
        CandyId = candyId;
        CandyName = candyName;
        CandyQuantity = candyQuantity;
        CandyImage = candyImage;
        CandyPrice = candyPrice;
        Price = new Money(candyPrice.Currency, candyPrice.Value * quantity);
        Quantity = quantity;
    }

    public static LineItem Create(
        CandyId candyId,
        string candyName,
        int candyQuantity,
        string candyImage,
        Money candyPrice,
        int quantity)
        => new(
            Guid.NewGuid(),
            candyId,
            candyName,
            candyQuantity,
            candyImage,
            candyPrice,
            quantity);


    public void DisableLineItem()
    {
        IsDisabled = true;
    }

    public void UpdateCandy(Candy candy)
    {
        CandyName = candy.Name;
        CandyQuantity = candy.Quantity;
        CandyImage = candy.Image;
        CandyPrice = candy.Price;
        Price = new Money(CandyPrice.Currency, CandyPrice.Value * Quantity);
    }

    public void Update(
        int quantity)
    {
        Quantity += quantity;
        Price = new Money(CandyPrice.Currency, CandyPrice.Value * Quantity);
    }

    private LineItem() { }
}
