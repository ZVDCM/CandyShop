using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CandyShop.Api.GraphQL.Users;

public static class UserTypeExtensions
{
    public static IRequestExecutorBuilder AddUserType(this IRequestExecutorBuilder builder)
    {
        builder.AddType<UserQueries>();
        builder.AddType<UserMutations>();
        builder.AddType<UserSubscriptions>();
        return builder;
    }
}