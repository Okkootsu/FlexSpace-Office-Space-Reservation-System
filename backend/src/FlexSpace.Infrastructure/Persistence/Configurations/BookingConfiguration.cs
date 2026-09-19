using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FlexSpace.Infrastructure.Persistence.Configurations
{
    public class BookingConfiguration : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.ToTable("Bookings");

            builder.HasKey(b => b.Id);

            builder.Property(b => b.SpaceId).IsRequired();
            builder.Property(b => b.GuestId).IsRequired();
            builder.Property(b => b.Status).IsRequired();

            // Value Object: DateTimeRange
            builder.OwnsOne(b => b.TimeRange, rangeBuilder =>
            {
                rangeBuilder.Property(r => r.StartUtc)
                    .HasColumnName("StartTimeUtc")
                    .IsRequired();

                rangeBuilder.Property(r => r.EndUtc)
                    .HasColumnName("EndTimeUtc")
                    .IsRequired();
            });

            // Value Object: Money (TotalPrice)
            builder.OwnsOne(b => b.TotalPrice, priceBuilder =>
            {
                priceBuilder.Property(m => m.Amount)
                    .HasColumnName("TotalPriceAmount")
                    .HasPrecision(18, 2)
                    .IsRequired();

                priceBuilder.Property(m => m.Currency)
                    .HasColumnName("TotalPriceCurrency")
                    .HasMaxLength(3)
                    .IsRequired();
            });

            // Çakışma sorgularının hızlı çalışması için Index
            builder.HasIndex("SpaceId", "Status");
        }
    }
}