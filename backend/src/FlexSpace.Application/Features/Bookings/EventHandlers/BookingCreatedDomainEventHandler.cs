using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace FlexSpace.Application.Features.Bookings.EventHandlers
{
    public class BookingCreatedDomainEventHandler : INotificationHandler<BookingCreatedDomainEvent>
    {   
        private readonly ILogger<BookingCreatedDomainEventHandler> _logger;

        public BookingCreatedDomainEventHandler(ILogger<BookingCreatedDomainEventHandler> logger)
        {
            _logger = logger;
        }

        public Task Handle(BookingCreatedDomainEvent notification, CancellationToken cancellationToken)
        {
            _logger.LogInformation(
                "[BİLDİRİM / OLUŞTURULDU]: Yeni bir rezervasyon oluşturuldu! BookingId: {BookingId}, MekanId: {SpaceId}, MisafirId: {GuestId}. Zaman: {OccurredOnUtc}",
                notification.BookingId,
                notification.SpaceId,
                notification.GuestId,
                notification.OccurredOnUtc
            );
            
            // Mock 
            _logger.LogInformation(
                "Mekan sahibine ve misafire onay e-postası başarıyla kuyruğa alındı (BookingId: {BookingId}).",
                notification.BookingId
            );

            return Task.CompletedTask;
        }
    }
}