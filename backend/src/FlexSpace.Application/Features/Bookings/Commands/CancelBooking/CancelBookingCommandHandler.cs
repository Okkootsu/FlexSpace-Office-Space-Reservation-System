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
        private readonly IUnitOfWork _unitOfWork;

        public CancelBookingCommandHandler(IBookingRepository bookingRepository, IUnitOfWork unitOfWork)
        {
            _bookingRepository = bookingRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(CancelBookingCommand request, CancellationToken cancellationToken)
        {
            var booking = await _bookingRepository.GetByIdAsync(request.BookingId);

            if (booking is null)
            {
                throw new InvalidOperationException("Rezervasyon bulunamadı.");
            }

            if (booking.GuestId != request.GuestId)
            {
                throw new InvalidOperationException("Rezervasyonu iptal etme yetkiniz yok.");
            }

            booking.Cancel();
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}