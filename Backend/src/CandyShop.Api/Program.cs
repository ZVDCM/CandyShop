using CandyShop.Api;
using CandyShop.Application;
using CandyShop.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Serilog;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services
        .AddPresentation()
        .AddApplication()
        .AddInfrastructure();

    builder.Host.UseSerilog((context, configuration) =>
        configuration.ReadFrom.Configuration(context.Configuration));
}

var app = builder.Build();
{
    app.UseSerilogRequestLogging();
    app.UseCors();
    app.UseWebSockets();
    app.MapGraphQL();
    app.UseStaticFiles();

    var url = builder.WebHost.GetSetting(WebHostDefaults.ServerUrlsKey);
    Log.Information($"Server is running: {url}/graphql");

    app.Run();
}
