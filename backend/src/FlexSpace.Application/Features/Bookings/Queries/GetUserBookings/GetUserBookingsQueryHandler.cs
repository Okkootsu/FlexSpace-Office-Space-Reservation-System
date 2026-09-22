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

        public GetUserBookingsQueryHandler(IBookingQueryService bookingQueryService)
        {
            _bookingQueryService = bookingQueryService;
        }

        public async Task<IReadOnlyList<BookingDto>> Handle(GetUserBookingsQuery request, CancellationToken cancellationToken)
        {
            return await _bookingQueryService.GetUserBookingsAsync(request.GuestId, cancellationToken);
        }
    }
}