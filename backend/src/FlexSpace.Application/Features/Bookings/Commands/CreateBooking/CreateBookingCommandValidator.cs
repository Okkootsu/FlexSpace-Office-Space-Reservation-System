using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace FlexSpace.Application.Features.Bookings.Commands.CreateBooking
{
    public class CreateBookingCommandValidator : AbstractValidator<CreateBookingCommand>
    {
        public CreateBookingCommandValidator()
        {
            RuleFor(x => x.SpaceId)
                .NotEmpty().WithMessage("Mekan ID boş olamaz.");

            RuleFor(x => x.GuestId)
                .NotEmpty().WithMessage("kullanıcı ID boş olamaz.");

            RuleFor(x => x.StartUtc)
                .GreaterThan(DateTime.UtcNow).WithMessage("Rezervasyon başlangıç zamanı gelecekte bir tarihte olmalıdır.");
            
            RuleFor(x => x.EndUtc)
                .GreaterThan(x => x.StartUtc).WithMessage("Rezervasyon bitiş zamanı başlangıç zamanından sonra olmalıdır.");
            
            RuleFor(x => (x.EndUtc - x.StartUtc).TotalHours)
                .GreaterThanOrEqualTo(1).WithMessage("En az 1 saatlik rezervasyon yapılmalıdır.")
                .LessThanOrEqualTo(24).WithMessage("Tek seferde en fazla 24 saatlik rezervasyon yapılabilir.");

        }
    }
}