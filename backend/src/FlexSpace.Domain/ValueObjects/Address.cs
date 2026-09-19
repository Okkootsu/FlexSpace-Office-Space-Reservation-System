using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlexSpace.Domain.ValueObjects
{
    public record Address(string City, string District, string Street, string? PostalCode);
}