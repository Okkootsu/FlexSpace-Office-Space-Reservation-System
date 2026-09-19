using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace FlexSpace.Application.Features.Spaces.Commands.CreateSpace
{
    public class CreateSpaceCommandValidator : AbstractValidator<CreateSpaceCommand>
    {
        public CreateSpaceCommandValidator()
        {
            RuleFor(x => x.HostId)
                .NotEmpty().WithMessage("Host kimliği boş olamaz.");

            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Mekan başlığı zorunludur.")
                .MaximumLength(150).WithMessage("Mekan başlığı en fazla 150 karakter olabilir.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Mekan açıklaması zorunludur.")
                .MaximumLength(2000).WithMessage("Açıklama en fazla 2000 karakter olabilir.");

            RuleFor(x => x.Type)
                .IsInEnum().WithMessage("Geçersiz mekan türü seçildi.");

            RuleFor(x => x.Capacity)
                .GreaterThan(0).WithMessage("Kapasite en az 1 kişi olmalıdır.")
                .LessThanOrEqualTo(500).WithMessage("Kapasite tek bir alan için 500 kişiyi aşamaz.");

            RuleFor(x => x.HourlyPriceAmount)
                .GreaterThan(0).WithMessage("Saatlik ücret 0'dan büyük olmalıdır.");

            RuleFor(x => x.Currency)
                .NotEmpty().WithMessage("Para birimi belirtilmelidir.")
                .Length(3).WithMessage("Para birimi ISO standardında 3 karakter olmalıdır (Örn: TRY, USD).");

            RuleFor(x => x.City)
                .NotEmpty().WithMessage("Şehir alanı zorunludur.");

            RuleFor(x => x.District)
                .NotEmpty().WithMessage("İlçe alanı zorunludur.");

            RuleFor(x => x.Street)
                .NotEmpty().WithMessage("Sokak/Cadde adresi zorunludur.");
        }
    }
}