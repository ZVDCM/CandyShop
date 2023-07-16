using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Candies;
using Microsoft.EntityFrameworkCore;

namespace CandyShop.Infrastructure.Persistence.Repositories;

public sealed class CandyRepository : ICandyRepository
{
    private readonly ApplicationDbContext _context;

    public CandyRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Candy>> GetAllCandiesAsync(CancellationToken token)
        => await _context.Candies.ToListAsync(token);

    public async Task<Candy?> GetCandyAsync(CandyId id, CancellationToken token)
        => await _context.Candies.FindAsync(new object?[] { id, token }, cancellationToken: token);

    public async Task<Candy> AddCandyAsync(Candy candy, CancellationToken token)
    {
        var result = await _context.Candies.AddAsync(candy, token);
        return result.Entity;
    }

    public void RemoveCandy(Candy candy)
        => _context.Candies.Remove(candy);
}