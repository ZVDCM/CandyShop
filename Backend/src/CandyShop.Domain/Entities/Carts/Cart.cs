using System;
using System.Collections.Generic;
using System.Linq;
using CandyShop.Domain.Abstraction;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Carts.Events;
using CandyShop.Domain.Entities.Carts.LineItems;
using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.Interfaces;
using CandyShop.Domain.ValueObjects;

namespace CandyShop.Domain.Entities.Carts;

public sealed class Cart : Entity, IAggregate
{
    public CartId Id { get; private set; } = null!;
    public UserId UserId { get; private set; } = null!;
    public string UserName { get; private set; } = string.Empty;
    public string UserEmail { get; private set; } = string.Empty;
    public string UserAddress { get; private set; } = string.Empty;
    public Money TotalPrice { get; private set; } = null!;

    private readonly List<LineItem> _lineItems = new();
    public IEnumerable<LineItem> LineItems => _lineItems;

    private Cart(Guid id, UserId userId, string userName, string userEmail, string userAddress)
    {
        Id = new CartId(id);
        UserId = userId;
        UserName = userName;
        UserEmail = userEmail;
        UserAddress = userAddress;
    }

    public static Cart Create(UserId userId, string userName, string userEmail, string userAddress)
        => new(Guid.NewGuid(), userId, userName, userEmail, userAddress);

    public void AddCandy(Candy candy, int quantity)
    {
        var lineItem = GetLineItem(candy.Id);
        if (lineItem is null)
        {
            lineItem = LineItem.Create(candy.Id, candy.Name, candy.Quantity, candy.Image, candy.Price, quantity);
            _lineItems.Add(lineItem);
            TotalPrice = new Money(lineItem.Price.Currency, TotalPrice.Value + lineItem.Price.Value);
            return;
        }

        lineItem.Update(quantity);
        TotalPrice = new Money(lineItem.Price.Currency, AggregateLineItemPrice());
    }

    public void RemoveCandy(Candy candy)
    {
        var lineItem = GetLineItem(candy.Id);
        if (lineItem is null) return;
        _lineItems.Remove(lineItem);

        TotalPrice = new Money(lineItem.Price.Currency, AggregateLineItemPrice());
    }

    public void RemoveLineItem(LineItem lineItem)
    {
        _lineItems.Remove(lineItem);
    }

    public void UpdateUser(User user)
    {
        UserName = user.Name;
        UserEmail = user.Email;
        UserAddress = user.Address;
    }

    public void CheckOutCart()
    {
        AddDomainEvent(new CheckedOutCart(this));
    }

    public void ClearLineItems()
    {
        var disabledLineItems = _lineItems.Where(item => item.IsDisabled == true).ToList();
        _lineItems.Clear();
        _lineItems.AddRange(disabledLineItems);
        TotalPrice = new Money(Money.DefaultCurrency, 0);
    }

    public void DeductLineItemPrice(LineItem lineItem)
    {
        TotalPrice = new Money(lineItem.Price.Currency, AggregateLineItemPrice());
    }

    public LineItem? GetLineItem(CandyId candyId)
        => _lineItems.SingleOrDefault(x => x.CandyId == candyId);

    public LineItem? GetLineItem(LineItemId lineItemId)
        => _lineItems.SingleOrDefault(x => x.Id == lineItemId);

    private decimal AggregateLineItemPrice() => _lineItems.Aggregate(0m, (sum, item) => !item.IsDisabled ? sum + item.Price.Value : sum);

    private Cart() { }
}
