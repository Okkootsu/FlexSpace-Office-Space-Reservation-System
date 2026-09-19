using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Domain.Enums;
using MediatR;

namespace FlexSpace.Application.Features.Spaces.Queries.GetSpaces
{
    public record GetSpacesQuery(
        string? City = null,
        SpaceType? Type = null,
        int? MinCapacity = null
    ) : IRequest<IReadOnlyList<SpaceDto>>;
}