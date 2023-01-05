using System.Data.SqlClient;
using TP_Connection.Data.Crypto;

namespace Infrastructure.Connection
{
    public class DbBase : DbRepository, IDisposable
    {
        public DbBase(string conexion)
        {
            AddConnection(conexion);
            VerifyConnectionState(Connection);
        }

        internal static string Connection { get; set; }

        void VerifyConnectionState(string connection)
        {
            if (sqlConnection != null)
            {
                sqlConnection.Close();
                sqlConnection.Dispose();
            }
            sqlConnection = new SqlConnection(connection);
            sqlConnection.Open();
        }

        private void AddConnection(string conexion)
        {
            Connection = (string.IsNullOrWhiteSpace(conexion) ? CrypterDefault.Decrypt(ConfigurationManager.ConnectionStrings("DefaultConnection")) : conexion);
        }


        public void Dispose()
        {
            if (sqlConnection != null)
            {
                sqlConnection.Close();
                sqlConnection.Dispose();
            }
            GC.SuppressFinalize(this);
        }
    }
}
