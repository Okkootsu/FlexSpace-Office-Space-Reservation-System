using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Common.Interfaces;
using FlexSpace.Domain.Entities;
using FlexSpace.Domain.ValueObjects;
using MediatR;

namespace FlexSpace.Application.Features.Bookings.Commands.CreateBooking
{
    public class CreateBookingCommandHandler : IRequestHandler<CreateBookingCommand, Guid>
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly ISpaceRepository _spaceRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CreateBookingCommandHandler(IBookingRepository bookingRepository, ISpaceRepository spaceRepository, IUnitOfWork unitOfWork)
        {
            _bookingRepository = bookingRepository;
            _spaceRepository = spaceRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateBookingCommand request, CancellationToken cancellationToken)
        {
            var space = await _spaceRepository.GetByIdAsync(request.SpaceId, cancellationToken);
            if (space == null || !space.IsActive)
            {
                throw new InvalidOperationException("Rezervasyon yapılmak istenen mekan bulunamadı veya aktif değil.");
            }

            var requestedRange = new DateTimeRange(request.StartUtc, request.EndUtc);
            var isOverlapping = await _bookingRepository.HasOverlappingBookingAsync(request.SpaceId, requestedRange, cancellationToken);

            if (isOverlapping)
            {
                throw new InvalidOperationException("Seçilen saat diliminde bu mekan için zaten onaylanmış bir rezervasyon bulunmaktadır.");
            }

            var booking = Booking.Create(
                spaceId: request.SpaceId,
                guestId: request.GuestId,
                timeRange: requestedRange,
                hourlyPrice: space.HourlyPrice
            );

            await _bookingRepository.AddAsync(booking, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            
            return booking.Id;
        }
    }
}