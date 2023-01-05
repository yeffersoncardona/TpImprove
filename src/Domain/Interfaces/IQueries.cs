
namespace Domain.Interfaces
{
    public interface IQueries<T>
    {
        public List<T> GetAll();
        public T Search(object obj) ;
        public T GetByid(object obj, string storeprocedure) ;
        public T GetByid(object obj) ;
        public List<T> SearchList(object obj) ;
        public List<T2>SearchList<T2>(object obj, string procedure) ;
        public List<T> SearchList(object obj, string procedure) ;
        
    }
}
