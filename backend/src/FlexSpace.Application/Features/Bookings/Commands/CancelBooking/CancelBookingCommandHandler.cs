using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Common.Interfaces;
using MediatR;

namespace FlexSpace.Application.Features.Bookings.Commands.CancelBooking
{
    public class CancelBookingCommandHandler : IRequestHandler<CancelBookingCommand>
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IUnitOfWork _unitOfWork;

        public CancelBookingCommandHandler(
            IBookingRepository bookingRepository,
            ICurrentUserService currentUserService,
            IUnitOfWork unitOfWork)
        {
            _bookingRepository = bookingRepository;
            _currentUserService = currentUserService;
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(CancelBookingCommand request, CancellationToken cancellationToken)
        {
            var currentUserId = _currentUserService.UserId
                ?? throw new UnauthorizedAccessException("İptal işlemi için geçerli bir oturum açmalısınız.");

            var booking = await _bookingRepository.GetByIdAsync(request.BookingId);

            if (booking is null)
            {
                throw new InvalidOperationException("Rezervasyon bulunamadı.");
            }

            if (booking.GuestId != currentUserId)
            {
                throw new InvalidOperationException("Bu rezervasyonu iptal etme yetkiniz yok.");
            }

            booking.Cancel();
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}