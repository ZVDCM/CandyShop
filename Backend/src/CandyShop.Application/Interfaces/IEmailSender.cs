using System.Threading;
using System.Threading.Tasks;

namespace CandyShop.Application.Interfaces;

public interface IEmailSender
{
    Task<bool> SendEmailAsync(string to, string subject, string message, CancellationToken token);
}