using Microsoft.Extensions.Configuration;


namespace Infrastructure.Connection;

public static class ConfigurationManager
{
    public static string ConnectionStrings(string name)
    {
        return new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build()
            .GetConnectionString(name);
    }

    public static string AppSettings(string name)
    {
        return new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build()
            .GetSection("AppSettings")[name];
    }

    public static string UrlSettings(string name)
    {
        return new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build()
            .GetSection("UrlSettings")[name];
    }
}
