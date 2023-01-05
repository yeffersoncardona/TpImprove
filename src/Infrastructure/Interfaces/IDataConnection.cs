using System.Data;

namespace Infrastructure.Interfaces
{
    public interface IDataConnection : IDisposable
    {
        string ConnectionString { get; init; }

        int DeleteObject<T>(object obj);
        int DeleteObject(object obj, string procedure);
        void SaveBulkCopy(DataTable obj);
        int Save<T>(object obj);
        int SaveObject(object obj, string procedure);
        T SaveObject<T>(object obj) where T : class, new();
        T SaveObject<T>(object obj, string procedure);
        int SaveObject(DataTable obj, string procedure);
        T SerchObject<T>(object obj) where T : class, new();
        T SerchObject<T>(object obj, string procedure) where T : class, new();
        List<T> SearchList<T>(object obj) where T : class, new();
        List<T> SearchList<T>(object obj, string procedure) where T : class, new();
        int Update<T>(object obj);
        int UpDateObject(object obj, string procedure);
        T UpDateObject<T>(object obj);
        T UpDateObject<T>(object obj, string procedure);
    }
}
