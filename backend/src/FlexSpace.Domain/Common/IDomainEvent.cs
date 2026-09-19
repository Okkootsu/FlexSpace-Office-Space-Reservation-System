using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlexSpace.Domain.Common
{
    public interface IDomainEvent
    {
        DateTime OccurredOnUtc { get; }
    }
}