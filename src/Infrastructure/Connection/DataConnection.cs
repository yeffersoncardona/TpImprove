using Infrastructure.Interfaces;
using System.Data;
using System.Data.SqlClient;
using TP_Connection.Data.Crypto;

namespace Infrastructure.Connection
{
    public class DataConnection : DbRepository, IDataConnection, IDisposable
    {
        public DataConnection(string conexion)
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
        public string ConnectionString { get; init; }


        /// <summary>
        /// Object T is a reference of object that you want to save
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        /// <returns></returns>
        public int DeleteObject<T>(object obj)
        {
            return base.SaveObject(obj, "spDelete_" + typeof(T).Name);
        }

        public int DeleteObject(object obj, string procedure)
        {
            return base.SaveObject(obj, procedure);
        }

        public void SaveBulkCopy(DataTable obj)
        {
            base.SaveBulkCopy(obj);
        }

        /// <summary>
        /// Object T is a reference of object that you want to save
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        /// <returns></returns>
        public int Save<T>(object obj)
        {
            return base.SaveObject(obj, "spSave_" + obj.GetType().Name);
        }

        public int SaveObject(object obj, string procedure)
        {
            return base.SaveObject(obj, procedure);
        }

        public T SaveObject<T>(object obj) where T : class, new()
        {
            return base.SaveObject<T>(obj, "spSave_" + obj.GetType().Name);
        }

        public T SaveObject<T>(object obj, string procedure)
        {
            return base.SaveObject<T>(obj, procedure);
        }

        public int SaveObject(DataTable obj, string procedure)
        {
            return base.SaveObject(obj, procedure);
        }

        public T SerchObject<T>(object obj) where T : class, new()
        {
            return base.SearchList<T>(obj, "spSelect_" + typeof(T).Name).FirstOrDefault();
        }

        public T SerchObject<T>(object obj, string procedure) where T : class, new()
        {
            return base.SearchList<T>(obj, procedure).FirstOrDefault();
        }

        public List<T> SearchList<T>(object obj) where T : class, new()
        {
            return base.SearchList<T>(obj, "spSelect_" + typeof(T).Name);
        }

        public List<T> SearchList<T>(object obj, string procedure) where T : class, new()
        {
            return base.SearchList<T>(obj, procedure);
        }


        public int Update<T>(object obj)
        {
            return base.SaveObject(obj, "spUpdate_" + obj.GetType().Name);
        }

        public int UpDateObject(object obj, string procedure)
        {
            return base.SaveObject(obj, procedure);
        }

        public T UpDateObject<T>(object obj)
        {
            return base.SaveObject<T>(obj, "spUpdate_" + obj.GetType().Name);
        }

        public T UpDateObject<T>(object obj, string procedure)
        {
            return base.SaveObject<T>(obj, procedure);
        }

    }
}
