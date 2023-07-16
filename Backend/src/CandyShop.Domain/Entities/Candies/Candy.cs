using System;
using CandyShop.Domain.Abstraction;
using CandyShop.Domain.Entities.Candies.Events;
using CandyShop.Domain.ValueObjects;

namespace CandyShop.Domain.Entities.Candies;

public sealed class Candy : Entity
{
    public const int CandyNameMaxLength = 50;
    public CandyId Id { get; private set; } = null!;
    public string Name { get; private set; } = string.Empty;
    public int Quantity { get; private set; } = 0;
    public string Image { get; private set; } = string.Empty;
    public Money Price { get; private set; } = null!;

    private Candy(Guid id, string name, int quantity, string image, Money price)
    {
        Id = new CandyId(id);
        Name = name;
        Quantity = quantity;
        Image = image;
        Price = price;
    }

    public static Candy Create(string name, int quantity, string image, Money price)
        => new(Guid.NewGuid(), name, quantity, image, price);

    public void Update(string name, int quantity, string image, Money price)
    {
        Name = name;
        Quantity = quantity;
        Image = image;
        Price = price;

        AddDomainEvent(new UpdatedCandy(this));
    }

    public void UpdateQuantity(int quantity)
    {
        Quantity = quantity;
    }

    public void Remove()
    {
        AddDomainEvent(new DeletedCandy(this));
    }

    private Candy() { }
}
