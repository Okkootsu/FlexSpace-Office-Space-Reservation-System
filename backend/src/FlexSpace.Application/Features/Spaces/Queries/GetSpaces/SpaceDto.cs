using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Domain.Enums;

namespace FlexSpace.Application.Features.Spaces.Queries.GetSpaces
{
    public record SpaceDto(
        Guid Id,
        string Title,
        string Description,
        SpaceType Type,
        int Capacity,
        decimal HourlyPrice,
        string Currency,
        string City,
        string District,
        IReadOnlyList<string> Amenities
    );
}