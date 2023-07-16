using CandyShop.Domain.Entities.Carts;
using CandyShop.Domain.Shared.Results;
using MediatR;

namespace CandyShop.Application.Features.Carts.Queries.GetCart;

public sealed record GetCartQuery() : IRequest<Result<Cart>>;