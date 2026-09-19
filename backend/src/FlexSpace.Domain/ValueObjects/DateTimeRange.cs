using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlexSpace.Domain.ValueObjects
{
    public record DateTimeRange
    {
        public DateTime StartUtc { get; init; }
        public DateTime EndUtc { get; init; }

        public DateTimeRange(DateTime startUtc, DateTime endUtc)
        {
            if (startUtc > endUtc)
            {
                throw new ArgumentException("Bitiş zamanı başlangıç zamanından sonra olmalıdır.");
            }

            StartUtc = startUtc;
            EndUtc = endUtc;
        }

        public double TotalHours => (EndUtc - StartUtc).TotalHours;

        public bool OverlapsWith(DateTimeRange other)
        {
            return StartUtc < other.EndUtc && EndUtc > other.StartUtc;
        }
    }
}