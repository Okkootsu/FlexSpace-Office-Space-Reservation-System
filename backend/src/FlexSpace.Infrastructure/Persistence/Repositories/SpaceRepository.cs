using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Common.Interfaces;
using FlexSpace.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FlexSpace.Infrastructure.Persistence.Repositories
{
    public class SpaceRepository : ISpaceRepository
    {
        private readonly ApplicationDbContext _context;

        public SpaceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Space space, CancellationToken cancellationToken = default)
        {
            await _context.Spaces.AddAsync(space, cancellationToken);
        }

        public async Task<Space?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _context.Spaces.FirstOrDefaultAsync(s => s.Id == id, cancellationToken);
        }

        public void Update(Space space)
        {
            _context.Spaces.Update(space);
        }
    }
}