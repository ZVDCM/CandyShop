using System.Reflection;
using CandyShop.Api.Configurations.Setups;
using CandyShop.Api.GraphQL.Candies;
using CandyShop.Api.GraphQL.Carts;
using CandyShop.Api.GraphQL.Users;
using HotChocolate.Types;
using Mapster;
using MapsterMapper;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace CandyShop.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        services
            .AddSetups()
            .AddCORS()
            .AddMappings()
            .AddGraphQL();
        return services;
    }

    private static IServiceCollection AddCORS(this IServiceCollection services)
    {
        services.AddCors(options => options.AddDefaultPolicy(builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        }));
        return services;
    }

    private static IServiceCollection AddSetups(this IServiceCollection services)
    {
        services.ConfigureOptions<DatabaseOptionsSetup>();
        services.ConfigureOptions<EmailOptionsSetup>();
        return services;
    }
    private static IServiceCollection AddMappings(this IServiceCollection services)
    {
        var config = TypeAdapterConfig.GlobalSettings;
        config.Scan(Assembly.GetExecutingAssembly());
        services.AddSingleton(config);
        services.AddScoped<IMapper, ServiceMapper>();
        return services;
    }

    private static IServiceCollection AddGraphQL(this IServiceCollection services)
    {
        services
            .AddGraphQLServer()
            .AddQueryType()
            .AddMutationType()
            .AddSubscriptionType()
            .AddType<UploadType>()
            .AddUserType()
            .AddCandyType()
            .AddCartType()
            .AddInMemorySubscriptions();
        return services;
    }
}