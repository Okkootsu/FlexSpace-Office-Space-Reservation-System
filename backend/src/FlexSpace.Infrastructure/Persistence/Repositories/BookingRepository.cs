using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Common.Interfaces;
using FlexSpace.Domain.Entities;
using FlexSpace.Domain.Enums;
using FlexSpace.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace FlexSpace.Infrastructure.Persistence.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly ApplicationDbContext _context;

        public BookingRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Booking booking, CancellationToken cancellationToken = default)
        {
            await _context.Bookings.AddAsync(booking, cancellationToken);
        }

        public async Task<Booking?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Bookings.FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
        }

        public async Task<bool> HasOverlappingBookingAsync(Guid spaceId, DateTimeRange range, CancellationToken cancellationToken = default)
        {
            return await _context.Bookings.AnyAsync(b =>
                b.SpaceId == spaceId &&
                b.Status != BookingStatus.Cancelled &&
                b.TimeRange.StartUtc < range.EndUtc &&
                b.TimeRange.EndUtc > range.StartUtc,
                cancellationToken   
            );
        }
    }
}