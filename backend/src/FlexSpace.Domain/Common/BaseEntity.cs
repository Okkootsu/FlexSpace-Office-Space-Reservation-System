using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlexSpace.Domain.Common
{
    public abstract class BaseEntity
    {
        public Guid Id { get; protected set; } = Guid.NewGuid();
        public DateTime CreatedAtUtc { get; protected set; } = DateTime.UtcNow;
        public DateTime? UpdatedAtUtc { get; protected set; }
    }
}