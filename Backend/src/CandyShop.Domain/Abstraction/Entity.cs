using System.Collections.Generic;
using CandyShop.Domain.Interfaces;

namespace CandyShop.Domain.Abstraction;

public abstract class Entity : IEntity
{
    private readonly List<IDomainEvent> _domainEvents = new();
    public IEnumerable<IDomainEvent> DomainEvents => _domainEvents;

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }

    protected void AddDomainEvent(IDomainEvent domainEvent){
        _domainEvents.Add(domainEvent);
    }
}