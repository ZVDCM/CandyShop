using System;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using CandyShop.Domain.Entities.Carts;
using Microsoft.EntityFrameworkCore;

namespace CandyShop.Infrastructure.Persistence.Repositories;

public sealed class CartRepository : ICartRepository
{
    private readonly ApplicationDbContext _context;

    public CartRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Cart?> GetCartAsync(CancellationToken token)
        => await _context.Carts.FirstOrDefaultAsync(token);

    public async Task<Cart> AddCartAsync(Cart cart, CancellationToken token)
    {
        var result = await _context.Carts.AddAsync(cart, token);
        return result.Entity;
    }

    public void RemoveCart(Cart cart)
        => _context.Carts.Remove(cart);
}