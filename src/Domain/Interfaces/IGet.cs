
namespace Domain.Interfaces;

public interface IGet
{
    public Task<T> GetAsync<T>(object obj, string command) where T : class, new();
}
