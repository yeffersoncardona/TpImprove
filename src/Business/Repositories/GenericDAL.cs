using Business.Utils;
using Domain.Util;
using Domain.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Connection;

namespace Business.Repositories
{
    public class GenericDal : IDisposable, IRepository
    {
        private readonly IDataConnection _dataConnection;

        public GenericDal()
        {
            _dataConnection = new DataConnection(string.Empty);
        }
        public int Delete<T>(object obj) => _dataConnection.DeleteObject<T>(obj);
        public void Dispose()
        {
            if (_dataConnection != null)
                _dataConnection.Dispose();

            GC.SuppressFinalize(this);
        }

        public List<T> GetAll<T>() where T : class, new() => _dataConnection.SearchList<T>(default);
        public Task<T> Post<T>(object obj) where T : class, new() => Task.Run(() => _dataConnection.SaveObject<T>(obj));
        public Task<T> Post<T>(object obj, string procedure) => Task.Run(() => _dataConnection.SaveObject<T>(obj, procedure));
        public T2 Update<T2>(object obj) => _dataConnection.UpDateObject<T2>(obj);
        public T2 Update<T2>(object obj, string procedure) => _dataConnection.UpDateObject<T2>(obj, procedure);
        public T Search<T>(object obj) where T : class, new() => _dataConnection.SerchObject<T>(obj);
        public T GetByid<T>(object obj, string storeprocedure) where T : class, new() => _dataConnection.SerchObject<T>(obj, storeprocedure);
        public T GetByid<T>(object obj) where T : class, new() => _dataConnection.SerchObject<T>(obj);
        public Task<List<T>> GetListAsync<T>(object obj) where T : class, new() => Task.Run(() => _dataConnection.SearchList<T>(obj));
        public List<T> Getlist<T>(object obj, string procedure) where T : class, new() => _dataConnection.SearchList<T>(obj, procedure);
        public Task<T> GetAsync<T>(object obj, string procedure) where T : class, new() => Task.Run(() => _dataConnection.SerchObject<T>(obj, procedure));
    }

    public class GenericDalCube : IDisposable
    {

        private readonly IDataConnection _dataConnection;
        public GenericDalCube()
        {
            _dataConnection = new DataConnection(DBUtilities.GetConnectionString("DataCubeConnection"));
        }
        public void Dispose()
        {
            if (_dataConnection != null)
                _dataConnection.Dispose();

            GC.SuppressFinalize(this);
        }
        public Task<T> Post<T>(object obj) where T : class, new() => Task.Run(() => _dataConnection.SaveObject<T>(obj));
        public Task<T> Post<T>(object obj, string procedure) => Task.Run(() => _dataConnection.SaveObject<T>(obj, procedure));
        public T2 Update<T2>(object obj) => _dataConnection.UpDateObject<T2>(obj);
        public T2 Update<T2>(object obj, string procedure) => _dataConnection.UpDateObject<T2>(obj, procedure);
        public T Search<T>(object obj) where T : class, new() => _dataConnection.SerchObject<T>(obj);
        public T GetByid<T>(object obj, string storeprocedure) where T : class, new() => _dataConnection.SerchObject<T>(obj, storeprocedure);
        public T GetByid<T>(object obj) where T : class, new() => _dataConnection.SerchObject<T>(obj);
        public Task<List<T>> Get<T>(object obj) where T : class, new() => Task.Run(() => _dataConnection.SearchList<T>(obj));
        public List<T> Getlist<T>(object obj, string procedure) where T : class, new() => _dataConnection.SearchList<T>(obj, procedure);
        public Task<T> Get<T>(object obj, string procedure) where T : class, new() => Task.Run(() => _dataConnection.SerchObject<T>(obj, procedure));
    }
}