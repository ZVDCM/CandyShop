using System;
using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.ValueObjects;
using CandyShop.Infrastructure.Persistence.Interceptors;
using Microsoft.EntityFrameworkCore;

namespace CandyShop.Infrastructure.Persistence;

public sealed class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Candy> Candies { get; set; } = null!;
    public DbSet<Cart> Carts { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        Seeding(builder);
    }

    private static void Seeding(ModelBuilder builder)
    {
        var user = User.Create("Juan Dela Cruz", "Juan.DelaCruz@gmail.com", "Angeles City, Pampanga, Philippines");
        builder.Entity<User>().HasData(user);

        var cart = Cart.Create(user.Id, user.Name, user.Email, user.Address);
        builder.Entity<Cart>().HasData(cart);
        builder.Entity<Cart>().OwnsOne(c => c.TotalPrice).HasData(new { CartId = cart.Id, Currency = Money.DefaultCurrency, Value = 0m });

    }
}