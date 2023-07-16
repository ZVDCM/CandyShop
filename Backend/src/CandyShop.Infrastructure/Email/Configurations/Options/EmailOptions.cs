namespace CandyShop.Infrastructure.Email.Configurations.Options;

public sealed class EmailOptions
{
    public const string APISectionName = "SendGrid";
    public const string APIKeyName = "APIKey";
    public string APIKey { get; set; } = string.Empty;
    public string From { get; set; } = string.Empty;
}