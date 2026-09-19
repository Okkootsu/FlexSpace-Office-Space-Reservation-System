using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Common.Interfaces;
using FlexSpace.Application.Features.Spaces.Queries.GetSpaces;
using Microsoft.EntityFrameworkCore;

namespace FlexSpace.Infrastructure.Persistence.Services
{
    public class SpaceQueryService : ISpaceQueryService
    {
        private readonly ApplicationDbContext _context;

        public SpaceQueryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<SpaceDto?> GetByIdAsync(Guid spaceId, CancellationToken cancellationToken = default)
        {
            return _context.Spaces.AsNoTracking()
                .Where(s => s.Id == spaceId && s.IsActive)
                .Select(s => new SpaceDto(
                    s.Id,
                    s.Title,
                    s.Description,
                    s.Type,
                    s.Capacity,
                    s.HourlyPrice.Amount,
                    s.HourlyPrice.Currency,
                    s.Address.City,
                    s.Address.District,
                    s.Amenities.ToList()
                ))
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<IReadOnlyList<SpaceDto>> SearchSpacesAsync(GetSpacesQuery query,
         CancellationToken cancellationToken = default)
        {
            var dbQuery = _context.Spaces.AsNoTracking().Where(s => s.IsActive);

            if (!string.IsNullOrWhiteSpace(query.City))
            {
                dbQuery = dbQuery.Where(s => s.Address.City.ToLower() == query.City.ToLower());
            }

            if (query.Type.HasValue)
            {
                dbQuery = dbQuery.Where(s => s.Type == query.Type.Value);
            }

            if (query.MinCapacity.HasValue)
            {
                dbQuery = dbQuery.Where(s => s.Capacity >= query.MinCapacity.Value);
            }

            return await dbQuery
                .Select(s => new SpaceDto(
                    s.Id,
                    s.Title,
                    s.Description,
                    s.Type,
                    s.Capacity,
                    s.HourlyPrice.Amount,
                    s.HourlyPrice.Currency,
                    s.Address.City,
                    s.Address.District,
                    s.Amenities.ToList()
                ))
                .ToListAsync(cancellationToken);
        }
    }
}