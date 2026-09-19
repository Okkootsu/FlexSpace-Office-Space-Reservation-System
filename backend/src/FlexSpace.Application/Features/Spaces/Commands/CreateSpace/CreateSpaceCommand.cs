using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlexSpace.Domain.Enums;
using MediatR;

namespace FlexSpace.Application.Features.Spaces.Commands
{
    public record CreateSpaceCommand(
        Guid HostId,
        string Title,
        string Description,
        SpaceType Type,
        int Capacity,
        decimal HourlyPriceAmount,
        string Currency,
        string City,
        string District,
        string Street,
        string? PostalCode,
        List<string>? Amenities
    ) : IRequest<Guid>;
}