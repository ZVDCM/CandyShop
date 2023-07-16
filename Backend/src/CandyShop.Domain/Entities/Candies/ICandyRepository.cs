using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CandyShop.Domain.Entities.Candies;

public interface ICandyRepository
{
    Task<IEnumerable<Candy>> GetAllCandiesAsync(CancellationToken token);
    Task<Candy?> GetCandyAsync(CandyId id, CancellationToken token);
    Task<Candy> AddCandyAsync(Candy candy, CancellationToken token);
    void RemoveCandy(Candy candy);
}