using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CandyShop.Api.GraphQL.Candies;

public static class CandyTypeExtensions
{
    public static IRequestExecutorBuilder AddCandyType(this IRequestExecutorBuilder builder)
    {
        builder.AddType<CandyQueries>();
        builder.AddType<CandyMutations>();
        builder.AddType<CandySubscriptions>();
        return builder;
    }
}