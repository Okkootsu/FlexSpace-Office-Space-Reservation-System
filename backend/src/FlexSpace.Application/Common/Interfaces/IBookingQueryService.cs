using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Features.Bookings.Queries.GetUserBookings;

namespace FlexSpace.Application.Common.Interfaces
{
    public interface IBookingQueryService
    {
        Task<IReadOnlyList<BookingDto>> GetUserBookingsAsync(Guid guestId, CancellationToken cancellationToken = default);
    }
}