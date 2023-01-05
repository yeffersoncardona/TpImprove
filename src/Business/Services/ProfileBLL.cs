using Business.Repositories;
using Domain.Entities;
using Domain.Util;

namespace Business.Services
{
    public sealed class ProfileBll
    {

        public List<Profile> GetAll()
        {
            try 
            {
                using (var repo = new GenericDal())
                    return repo.GetAll<Profile>(); }
            catch { return null; }
        }
        public async Task<Output> Create(Profile profile)
        {
            if (profile.Name == null) return new Output { Code = 1, Message = "Parameter is not defined" };
            using (var repo = new GenericDal())
               return await repo.Post<Output>(profile);
        }

        public Output Update(Profile profile)
        {
            if (profile.Id <= 0 || profile.Name == null) return new Output { Code = 1, Message = "Parameter is not defined" };
            using (var repo = new GenericDal())
            return repo.Update<Output>(profile);
        }

        public async Task<List<Profile>> GetActives()
        {
            using (var repo = new GenericDal())
            return await repo.GetListAsync<Profile>(new { IsActive = true });
        }
        public Profile GetById(int id)
        {
            try {
                using (var repo = new GenericDal()) 
                return repo.Search<Profile>(new { Id = id, IsActive = true }); }
            catch { return null; }
        }
    }
}