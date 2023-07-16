namespace CandyShop.Domain.ValueObjects;

public sealed record Money(string Currency, decimal Value)
{
    public const string DefaultCurrency = "PHP";
    public const int CurrencyMaxLength = 3;
    public const int ValuePrecision = 18;
    public const int ValueScale = 2;
};