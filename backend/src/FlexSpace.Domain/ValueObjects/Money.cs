using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlexSpace.Domain.ValueObjects
{
    public record Money(decimal Amount, string Currency = "TRY")
    {
        public static Money Zero(string currency = "TRY") => new Money(0, currency);

        public static Money operator +(Money a, Money b)
        {
            if (a.Currency != b.Currency)
                throw new InvalidOperationException("Farklı para birimleri toplanamaz.");
            return new Money(a.Amount + b.Amount, a.Currency);
        }
    }
}