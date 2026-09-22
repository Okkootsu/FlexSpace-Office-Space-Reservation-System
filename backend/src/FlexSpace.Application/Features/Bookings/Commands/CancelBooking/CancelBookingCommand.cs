using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace FlexSpace.Application.Features.Bookings.Commands.CancelBooking
{
    public record CancelBookingCommand(
        Guid BookingId,
        Guid GuestId
    ) : IRequest;
}