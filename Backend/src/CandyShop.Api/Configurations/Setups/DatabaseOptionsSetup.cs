using System;
using CandyShop.Infrastructure.Persistence.Configurations.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace CandyShop.Api.Configurations.Setups;

public sealed class DatabaseOptionsSetup : IConfigureOptions<DatabaseOptions>
{
    private readonly IConfiguration _configurations;

    public DatabaseOptionsSetup(IConfiguration configurations)
    {
        _configurations = configurations;
    }

    public void Configure(DatabaseOptions options)
    {
        options.ConnectionString = _configurations.GetConnectionString(DatabaseOptions.ConnectionStringName) ?? throw new Exception("ConnectionString not found");
        _configurations.GetSection(nameof(DatabaseOptions)).Bind(options);
    }
}