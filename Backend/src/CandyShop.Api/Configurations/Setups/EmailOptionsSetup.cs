using System;
using CandyShop.Infrastructure.Email.Configurations.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace CandyShop.Api.Configurations.Setups;

public sealed class EmailOptionsSetup : IConfigureOptions<EmailOptions>
{
    private readonly IConfiguration _configurations;

    public EmailOptionsSetup(IConfiguration configurations)
    {
        _configurations = configurations;
    }

    public void Configure(EmailOptions options)
    {
        options.APIKey = _configurations.GetSection(EmailOptions.APISectionName).GetValue<string>(EmailOptions.APIKeyName)?? throw new Exception($"{EmailOptions.APIKeyName} not found");
        _configurations.GetSection(nameof(EmailOptions)).Bind(options);
    }
}
