using CandyShop.Infrastructure.Persistence;
using CandyShop.Infrastructure.Persistence.Configurations.Options;
using CandyShop.Infrastructure.Persistence.Interceptors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace CandyShop.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services
            .AddScoped()
            .AddDatabase();

        return services;
    }

    private static IServiceCollection AddDatabase(this IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>((serviceProvider, options) =>
        {
            var databaseOptions = serviceProvider.GetRequiredService<IOptions<DatabaseOptions>>().Value;
            options.UseSqlServer(databaseOptions.ConnectionString, sqlActions =>
            {
                sqlActions.CommandTimeout(databaseOptions.CommandTimeoutInSeconds);
                sqlActions.EnableRetryOnFailure(databaseOptions.MaxRetryOnFailure);
            });
            options.EnableDetailedErrors(databaseOptions.EnableDetailedErrors);
            options.EnableSensitiveDataLogging(databaseOptions.EnableSensitiveDataLogging);
            options.AddInterceptors(new PublishedDomainEventsInterceptor(serviceProvider.GetRequiredService<IPublisher>()));
        });
        return services;
    }

    private static IServiceCollection AddScoped(this IServiceCollection services)
    {
        services.Scan(scan =>
            scan.FromCallingAssembly()
                .AddClasses()
                .AsMatchingInterface());
        return services;
    }
}