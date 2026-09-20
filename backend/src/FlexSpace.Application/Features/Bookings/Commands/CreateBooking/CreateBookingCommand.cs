using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace FlexSpace.Application.Features.Bookings.Commands.CreateBooking
{
    public record CreateBookingCommand(
        Guid SpaceId, 
        Guid GuestId,
        DateTime StartUtc,
        DateTime EndUtc
        ) : IRequest<Guid>;
    
}