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
        private readonly ICurrentUserService _currentUserService;
        private readonly IUnitOfWork _unitOfWork;

        public CreateBookingCommandHandler(
            IBookingRepository bookingRepository,
            ISpaceRepository spaceRepository,
            ICurrentUserService currentUserService,
            IUnitOfWork unitOfWork)
        {
            _bookingRepository = bookingRepository;
            _spaceRepository = spaceRepository;
            _currentUserService = currentUserService;
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateBookingCommand request, CancellationToken cancellationToken)
        {
            var guestId = _currentUserService.UserId
                ?? throw new UnauthorizedAccessException("Rezervasyon yapmak için geçerli bir oturum açmalısınız.");

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
                guestId: guestId,
                timeRange: requestedRange,
                hourlyPrice: space.HourlyPrice
            );

            await _bookingRepository.AddAsync(booking, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            
            return booking.Id;
        }
    }
}