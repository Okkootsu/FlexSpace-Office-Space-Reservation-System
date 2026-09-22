using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Domain.Enums;

namespace FlexSpace.Application.Features.Bookings.Queries.GetUserBookings
{
    public record BookingDto(
        Guid Id,
        Guid SpaceId,
        string SpaceTitle,
        string SpaceCity,
        string SpaceDistrict,
        DateTime StartUtc,
        DateTime EndUtc,
        double TotalHours,
        decimal TotalPrice,
        string Currency,
        BookingStatus Status,
        bool CanBeCancelled
    );
}