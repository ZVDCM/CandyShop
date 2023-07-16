using System;
using System.Threading;
using System.Threading.Tasks;
using CandyShop.Application.Interfaces;
using CandyShop.Infrastructure.Email.Configurations.Options;
using FluentEmail.Core;
using FluentEmail.Core.Interfaces;
using FluentEmail.SendGrid;
using Microsoft.Extensions.Options;

namespace CandyShop.Infrastructure.Email;

public sealed class EmailSender : IEmailSender
{
    private readonly EmailOptions _options;
    private readonly ISender _sender;

    public EmailSender(IOptions<EmailOptions> options)
    {
        _options = options.Value;
        _sender = new SendGridSender(_options.APIKey);
    }

    public async Task<bool> SendEmailAsync(string to, string subject, string message, CancellationToken token)
    {

        var email = FluentEmail.Core.Email
            .From(_options.From)
            .To(to)
            .Subject(subject)
            .Tag("CandyShop")
            .Body(message, true);

        var response = await _sender.SendAsync(email, token);

        if (response.Successful) return true;
        foreach (string error in response.ErrorMessages)
        {
            Console.WriteLine(error);
        }
        return false;
    }
}