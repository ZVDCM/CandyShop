using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Entities.Carts.LineItems;
using CandyShop.Domain.Entities.Users;
using CandyShop.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CandyShop.Infrastructure.Persistence.Configurations.Types;

public sealed class CartConfiguration : IEntityTypeConfiguration<Cart>
{
    public void Configure(EntityTypeBuilder<Cart> builder)
    {
        builder.Ignore(c => c.DomainEvents);
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id)
            .HasConversion(c => c.Value, c => new CartId(c));

        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(c => c.UserId);

        builder.OwnsOne(c => c.TotalPrice, pb =>
        {
            pb.Property(c => c.Currency)
                .HasMaxLength(Money.CurrencyMaxLength);
            pb.Property(c => c.Value)
                .HasPrecision(Money.ValuePrecision, Money.ValueScale);
        });

        builder.OwnsMany(c => c.LineItems, lb =>
        {
            lb.WithOwner().HasForeignKey("CartId");
            lb.HasKey(c => c.Id);
            lb.Property(c => c.Id)
                .HasConversion(c => c.Value, c => new LineItemId(c));

            lb.Property(c => c.CandyName)
                .HasMaxLength(LineItem.LineItemCandyNameMaxLength);

            lb.HasOne<Candy>()
                .WithMany()
                .HasForeignKey(c => c.CandyId)
                .OnDelete(DeleteBehavior.NoAction);

            lb.OwnsOne(c => c.Price, pb =>
            {
                pb.Property(c => c.Currency)
                    .HasMaxLength(Money.CurrencyMaxLength);
                pb.Property(c => c.Value)
                    .HasPrecision(Money.ValuePrecision, Money.ValueScale);
            });

            lb.OwnsOne(c => c.CandyPrice, pb =>
            {
                pb.Property(c => c.Currency)
                    .HasMaxLength(Money.CurrencyMaxLength);
                pb.Property(c => c.Value)
                    .HasPrecision(Money.ValuePrecision, Money.ValueScale);
            });
        });

        builder.Metadata.FindNavigation(nameof(Cart.LineItems))?.SetPropertyAccessMode(PropertyAccessMode.Field);
    }
}