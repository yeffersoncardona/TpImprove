using APIService.Filters;
using APIService.Utils;
using Business.Repositories;
using Business.CacheService;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TP_Connection.Data.Crypto;
using Business.Services;
using Infrastructure.Interfaces;
using Infrastructure.Connection;

namespace APIService.Extensions;

public static class ExtensionServices
{
    public static IServiceCollection ConfiguringAuthentication(this IServiceCollection services, IConfiguration configuration)
    {

        string SecretKey = CrypterDefault.Decrypt(configuration.GetSection("Jwt").GetSection("SecretKey").Value);
        string SecretRefreshKey = CrypterDefault.Decrypt(configuration.GetSection("Jwt").GetSection("SecretRefreshKey").Value);

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(jwt =>
        {
            jwt.RequireHttpsMetadata = false;
            jwt.SaveToken = true;
            jwt.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                LifetimeValidator = TokenLifetimeValidator.Validate
            };
        })
        .AddJwtBearer("refresh", jwt =>
        {
            jwt.RequireHttpsMetadata = false;
            jwt.SaveToken = true;
            jwt.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretRefreshKey)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                LifetimeValidator = TokenLifetimeValidator.Validate
            };
        })
        .AddMicrosoftIdentityWebApi(configuration.GetSection("AzureAd"), "AzureAd");
        return services;
    }

    public static IServiceCollection ConfiguringControllers(this IServiceCollection services)
    {
        services.AddControllers();
        services.AddControllersWithViews()
            .AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
        );

        services.AddEndpointsApiExplorer();
        services.AddControllers(options =>
        {
            options.Filters.Add<ErrorHandlingFilterAttribute>();
        });
        return services;
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<BlobStorageService>();
        services.AddScoped<ICacheService, CacheService>();
        services.AddScoped<IThirdPartyRepository, ThirdPartyRepository>();
        services.AddScoped<ClientBll>();
        return services;
    }

    public static IServiceCollection ConfiguringSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(c => {
            c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            c.IgnoreObsoleteActions();
            c.IgnoreObsoleteProperties();
            c.CustomSchemaIds(type => type.FullName);
        });
        return services;
    }

}

