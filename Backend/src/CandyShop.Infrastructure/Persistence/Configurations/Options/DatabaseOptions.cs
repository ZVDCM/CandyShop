namespace CandyShop.Infrastructure.Persistence.Configurations.Options;

public sealed class DatabaseOptions
{
    public const string ConnectionStringName = "Default";
    public string ConnectionString { get; set; } = string.Empty;
    public int CommandTimeoutInSeconds { get; set; }
    public int MaxRetryOnFailure { get; set; }
    public bool EnableDetailedErrors { get; set; }
    public bool EnableSensitiveDataLogging { get; set; }
}