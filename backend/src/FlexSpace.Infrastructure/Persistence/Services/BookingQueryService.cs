using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Common.Interfaces;
using FlexSpace.Application.Features.Bookings.Queries.GetUserBookings;
using FlexSpace.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace FlexSpace.Infrastructure.Persistence.Services
{
    public class BookingQueryService : IBookingQueryService
    {
        private readonly ApplicationDbContext _context;

        public BookingQueryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<BookingDto>> GetUserBookingsAsync(Guid guestId, CancellationToken cancellationToken = default)
        {
            var nowUtc = DateTime.UtcNow;

            return await (
                from b in _context.Bookings.AsNoTracking()
                join s in _context.Spaces.AsNoTracking() on b.SpaceId equals s.Id
                where b.GuestId == guestId
                orderby b.TimeRange.StartUtc descending
                select new BookingDto(
                    b.Id,
                    b.SpaceId,
                    s.Title,
                    s.Address.City,
                    s.Address.District,
                    b.TimeRange.StartUtc,
                    b.TimeRange.EndUtc,
                    (b.TimeRange.EndUtc - b.TimeRange.StartUtc).TotalHours,
                    b.TotalPrice.Amount,
                    b.TotalPrice.Currency,
                    b.Status,
                    b.Status != BookingStatus.Cancelled && b.TimeRange.StartUtc > nowUtc.AddHours(24)
                )
            ).ToListAsync(cancellationToken);
        }
    }
}