using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Domain.Entities;

namespace FlexSpace.Application.Common.Interfaces
{
    public interface ISpaceRepository
    {
        Task<Space?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task AddAsync(Space space, CancellationToken cancellationToken = default);
        void Update(Space space);
    }
}