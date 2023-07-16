using System.Threading;
using System.Threading.Tasks;

namespace CandyShop.Domain.Interfaces;

public interface IUnitOfWork
{
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}