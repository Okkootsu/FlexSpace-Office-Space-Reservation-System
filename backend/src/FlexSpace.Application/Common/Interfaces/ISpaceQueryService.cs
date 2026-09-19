using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Features.Spaces.Queries.GetSpaces;

namespace FlexSpace.Application.Common.Interfaces
{
    public interface ISpaceQueryService
    {
        Task<IReadOnlyList<SpaceDto>> SearchSpacesAsync(GetSpacesQuery query, CancellationToken cancellationToken = default);
        Task<SpaceDto?> GetByIdAsync(Guid spaceId, CancellationToken cancellationToken = default);
    }
}