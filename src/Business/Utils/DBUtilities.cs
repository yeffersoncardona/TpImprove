using Microsoft.Extensions.Configuration;

using TP_Connection.Data.Crypto;

namespace Business.Utils;

public static class DBUtilities
{
    public static string GetConnectionString(string connection)
    {
        var builder = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json").Build();
        
        var conn = builder.GetConnectionString(connection);

        return CrypterDefault.Decrypt(conn);

    }
}
