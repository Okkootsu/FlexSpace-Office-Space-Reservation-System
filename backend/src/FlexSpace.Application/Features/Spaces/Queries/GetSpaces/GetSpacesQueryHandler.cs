using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Application.Common.Interfaces;
using MediatR;

namespace FlexSpace.Application.Features.Spaces.Queries.GetSpaces
{
    public class GetSpacesQueryHandler : IRequestHandler<GetSpacesQuery, IReadOnlyList<SpaceDto>>
    {
        private readonly ISpaceQueryService _spaceQueryService;

        public GetSpacesQueryHandler(ISpaceQueryService spaceQueryService)
        {
            _spaceQueryService = spaceQueryService;
        }

        public async Task<IReadOnlyList<SpaceDto>> Handle(GetSpacesQuery request, CancellationToken cancellationToken)
        {
            return await _spaceQueryService.SearchSpacesAsync(request, cancellationToken);
        }
    }
}