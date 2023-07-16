using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CandyShop.Domain.Entities.Users;

public interface IUserRepository
{
    Task<User?> GetUserAsync(CancellationToken token);
}