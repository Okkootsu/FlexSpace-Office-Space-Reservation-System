using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Domain.Entities;
using FlexSpace.Domain.ValueObjects;

namespace FlexSpace.Application.Common.Interfaces
{
    public interface IBookingRepository
    {
        Task<Booking?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task AddAsync(Booking booking, CancellationToken cancellationToken = default);
        Task<bool> HasOverlappingBookingAsync(Guid spaceId, DateTimeRange range, CancellationToken cancellationToken = default);
        
    }
}