using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexSpace.Infrastructure.Persistence.Configurations
{
    public class SpaceConfiguration : IEntityTypeConfiguration<Space>
    {
        public void Configure(EntityTypeBuilder<Space> builder)
        {
            builder.ToTable("Spaces");

            builder.HasKey(s => s.Id);

            builder.Property(s => s.Title)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(s => s.Description)
                .IsRequired()
                .HasMaxLength(2000);

            builder.Property(s => s.Type)
                .IsRequired();

            builder.Property(s => s.Capacity)
                .IsRequired();

            builder.Property(s => s.IsActive)
                .IsRequired();

            // Value Object: Money (HourlyPrice)
            builder.OwnsOne(s => s.HourlyPrice, priceBuilder =>
            {
                priceBuilder.Property(m => m.Amount)
                    .HasColumnName("HourlyPriceAmount")
                    .HasPrecision(18, 2)
                    .IsRequired();

                priceBuilder.Property(m => m.Currency)
                    .HasColumnName("HourlyPriceCurrency")
                    .HasMaxLength(3)
                    .IsRequired();
            });

            // Value Object: Address
            builder.OwnsOne(s => s.Address, addressBuilder =>
            {
                addressBuilder.Property(a => a.City)
                    .HasColumnName("City")
                    .HasMaxLength(100)
                    .IsRequired();

                addressBuilder.Property(a => a.District)
                    .HasColumnName("District")
                    .HasMaxLength(100)
                    .IsRequired();

                addressBuilder.Property(a => a.Street)
                    .HasColumnName("Street")
                    .HasMaxLength(250)
                    .IsRequired();

                addressBuilder.Property(a => a.PostalCode)
                    .HasColumnName("PostalCode")
                    .HasMaxLength(20);
            });

            builder.Property(s => s.Amenities)
                .HasField("_amenities") 
                .UsePropertyAccessMode(PropertyAccessMode.Field) 
                .HasConversion(
                    v => string.Join(';', v),
                    v => v.Split(';', StringSplitOptions.RemoveEmptyEntries).ToList()
                )
                .HasColumnName("Amenities");
        }
    }
}