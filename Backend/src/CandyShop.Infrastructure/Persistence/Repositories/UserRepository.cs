using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Users;
using Microsoft.EntityFrameworkCore;

namespace CandyShop.Infrastructure.Persistence.Repositories;

public sealed class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetUserAsync(CancellationToken token)
        => await _context.Users.FirstOrDefaultAsync(token);
}