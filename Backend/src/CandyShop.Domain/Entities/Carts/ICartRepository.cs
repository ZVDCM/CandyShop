using System.Threading;
using System.Threading.Tasks;

namespace CandyShop.Domain.Entities.Carts;

public interface ICartRepository
{
    Task<Cart?> GetCartAsync(CancellationToken token);
    Task<Cart> AddCartAsync(Cart cart, CancellationToken token);
    void RemoveCart(Cart cart);
}