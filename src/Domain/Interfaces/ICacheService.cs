using Domain.Enums;

namespace Domain.Interfaces;
public interface ICacheService
{
    public Task SaveInCache(object obj, object objFileName, Blobs blob);
    public Task<T?> FindInCache<T>(object objFileName, Blobs blob) where T : class;
}
