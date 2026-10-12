using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Common.Interfaces;
using MediatR;

namespace FlexSpace.Application.Features.Bookings.Queries.GetUserBookings
{
    public class GetUserBookingsQueryHandler : IRequestHandler<GetUserBookingsQuery, IReadOnlyList<BookingDto>>
    {
        private readonly IBookingQueryService _bookingQueryService;
        private readonly ICurrentUserService _currentUserService;

        public GetUserBookingsQueryHandler(IBookingQueryService bookingQueryService, ICurrentUserService currentUserService)
        {
            _bookingQueryService = bookingQueryService;
            _currentUserService = currentUserService;
        }

        public async Task<IReadOnlyList<BookingDto>> Handle(GetUserBookingsQuery request, CancellationToken cancellationToken)
        {
            var guestId = request.GuestId 
                ?? _currentUserService.UserId 
                ?? throw new UnauthorizedAccessException("Rezervasyonlarınızı görüntülemek için geçerli bir oturum açmalısınız.");

            return await _bookingQueryService.GetUserBookingsAsync(guestId, cancellationToken);
        }
    }
}