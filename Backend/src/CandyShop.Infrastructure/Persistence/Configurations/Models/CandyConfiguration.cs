using CandyShop.Domain.Entities.Candies;
using CandyShop.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CandyShop.Infrastructure.Persistence.Configurations.Types;

public sealed class CandyConfiguration : IEntityTypeConfiguration<Candy>
{
    public void Configure(EntityTypeBuilder<Candy> builder)
    {
        builder.Ignore(c => c.DomainEvents);
        builder.HasKey(c => c.Id);
        builder.Property(c => c.Id)
            .HasConversion(c => c.Value, c => new CandyId(c));

        builder.Property(c => c.Name).HasMaxLength(Candy.CandyNameMaxLength);

        builder.OwnsOne(c => c.Price, pb =>
        {
            pb.Property(c => c.Currency)
                .HasMaxLength(Money.CurrencyMaxLength);
            pb.Property(c => c.Value)
                .HasPrecision(Money.ValuePrecision, Money.ValueScale);
        });
    }
}