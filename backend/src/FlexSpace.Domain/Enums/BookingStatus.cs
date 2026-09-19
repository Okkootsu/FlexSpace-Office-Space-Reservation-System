namespace FlexSpace.Domain.Enums
{
    public enum BookingStatus
    {
        Pending = 1,    // Onay veya ödeme bekliyor
        Confirmed = 2,  // Rezervasyon kesinleşti
        Cancelled = 3,  // İptal edildi
        Completed = 4   // Tamamlandı
    }
}