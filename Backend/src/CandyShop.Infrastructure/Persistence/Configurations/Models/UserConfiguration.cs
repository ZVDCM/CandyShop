using CandyShop.Domain.Entities.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CandyShop.Infrastructure.Persistence.Configurations.Types;

public sealed class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Ignore(c => c.DomainEvents);
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Id)
            .HasConversion(u => u.Value, u => new UserId(u));

        builder.Property(u => u.Name)
            .HasMaxLength(User.UserNameMaxLength);

        builder.Property(u => u.Address)
            .HasMaxLength(User.AddressMaxLength);
    }
}