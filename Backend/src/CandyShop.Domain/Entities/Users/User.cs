using System;
using CandyShop.Domain.Abstraction;
using CandyShop.Domain.Entities.Users.Events;

namespace CandyShop.Domain.Entities.Users;

public sealed class User : Entity
{
    public const int UserNameMaxLength = 50;
    public const int AddressMaxLength = 50;
    public UserId Id { get; private set; } = null!;
    public string Name { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string Address { get; private set; } = string.Empty;

    private User(Guid id, string name, string email, string address)
    {
        Id = new UserId(id);
        Name = name;
        Email = email;
        Address = address;
    }

    public static User Create(string name, string email, string address)
        => new(Guid.NewGuid(), name, email, address);

    public void Update(string name, string email, string address)
    {
        Name = name;
        Email = email;
        Address = address;

        AddDomainEvent(new UpdatedUser(this));
    }

    private User() { }
}
