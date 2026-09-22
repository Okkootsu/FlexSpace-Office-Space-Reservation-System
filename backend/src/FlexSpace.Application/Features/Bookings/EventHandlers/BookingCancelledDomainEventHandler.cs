using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace FlexSpace.Application.Features.Bookings.EventHandlers
{
    public class BookingCancelledDomainEventHandler : INotificationHandler<BookingCancelledDomainEvent>
    {
        private readonly ILogger<BookingCancelledDomainEventHandler> _logger;

        public BookingCancelledDomainEventHandler(ILogger<BookingCancelledDomainEventHandler> logger)
        {
            _logger = logger;
        }

        public Task Handle(BookingCancelledDomainEvent notification, CancellationToken cancellationToken)
        {
            _logger.LogWarning(
                "[BİLDİRİM / İPTAL]: Rezervasyon iptal edildi! BookingId: {BookingId}, MekanId: {SpaceId}, Zaman: {OccurredOnUtc}",
                notification.BookingId,
                notification.SpaceId,
                notification.OccurredOnUtc
            );

            // mock
            _logger.LogInformation(
                "İptal bildirimi mekan sahibine iletildi, takvim yuvası serbest bırakıldı."
            );

            return Task.CompletedTask;
        }
    }
}