using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace FlexSpace.Application.Features.Bookings.Commands.CancelBooking
{
    public class CancelBookingCommandValidator : AbstractValidator<CancelBookingCommand>
    {
        public CancelBookingCommandValidator()
        {
            RuleFor(x => x.BookingId)
                .NotEmpty().WithMessage("Rezervasyon ID boş olamaz.");

            RuleFor(x => x.GuestId)
                .NotEmpty().WithMessage("Kullanıcı ID boş olamaz.");
        }
    }
}