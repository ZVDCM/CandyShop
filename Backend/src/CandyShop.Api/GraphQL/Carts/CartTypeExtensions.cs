using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CandyShop.Api.GraphQL.Carts;

public static class CartTypeExtensions
{
    public static IRequestExecutorBuilder AddCartType(this IRequestExecutorBuilder builder)
    {
        builder.AddType<CartQueries>();
        builder.AddType<CartMutations>();
        builder.AddType<CartSubscriptions>();
        return builder;
    }
}