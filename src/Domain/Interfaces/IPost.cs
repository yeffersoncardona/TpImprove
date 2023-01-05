namespace Domain.Interfaces
{
    public interface IPost
    {
        public Task<T> Post<T>(object obj, string command);
    }
}
