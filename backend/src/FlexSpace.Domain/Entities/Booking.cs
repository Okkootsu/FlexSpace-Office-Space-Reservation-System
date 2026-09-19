using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Domain.Common;
using FlexSpace.Domain.Enums;
using FlexSpace.Domain.ValueObjects;

namespace FlexSpace.Domain.Entities
{
    public class Booking : AggregateRoot
    {
        public Guid SpaceId { get; private set; }
        public Guid GuestId { get; private set; }
        public DateTimeRange TimeRange { get; private set; } = null!;
        public Money TotalPrice { get; private set; } = null!;
        public BookingStatus Status { get; private set; }

        private Booking() { }

        public static Booking Create(Guid spaceId, Guid guestId, DateTimeRange timeRange, Money hourlyPrice)
        {
            var totalAmount = (decimal)timeRange.TotalHours * hourlyPrice.Amount;
            var totalPrice = new Money(totalAmount, hourlyPrice.Currency);

            var booking = new Booking
            {
                SpaceId = spaceId,
                GuestId = guestId,
                TimeRange = timeRange,
                TotalPrice = totalPrice,
                Status = BookingStatus.Confirmed
            };

            booking.AddDomainEvent(new BookingCreatedDomainEvent(booking.Id, spaceId, guestId));

            return booking;
        }

        public void Cancel()
        {
            if (Status == BookingStatus.Cancelled)
                throw new InvalidOperationException("Rezervasyon zaten iptal edilmiş.");
            
            if (TimeRange.StartUtc <= DateTime.UtcNow.AddHours(24))
                throw new InvalidOperationException("Başlangıç saatine 24 saatten az kalan rezervasyonlar iptal edilemez.");

            Status = BookingStatus.Cancelled;
            UpdatedAtUtc = DateTime.UtcNow;

            AddDomainEvent(new BookingCancelledDomainEvent(Id, SpaceId, GuestId));
        }
    }

    public record BookingCreatedDomainEvent(Guid BookingId, Guid SpaceId, Guid GuestId, DateTime OccurredOnUtc = default) : IDomainEvent
    {
        public DateTime OccurredOnUtc { get; } = DateTime.UtcNow;
    }

    public record BookingCancelledDomainEvent(Guid BookingId, Guid SpaceId, Guid GuestId, DateTime OccurredOnUtc = default) : IDomainEvent
    {
        public DateTime OccurredOnUtc { get; } = DateTime.UtcNow;
    }
}