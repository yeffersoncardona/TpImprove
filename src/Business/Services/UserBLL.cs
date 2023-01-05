using Business.Repositories;
using Domain.Entities;
using Domain.Util;

namespace Business.Services
{
    public sealed class UserBll
    {
        public List<User> GetAll()
        {
            using (var repo = new GenericDal())
            return repo.GetAll<User>();
        }
        public async Task<Output> Create(User user)
        {
            if (
                user.UserName == null ||
                user.FullName == null ||
                user.ProfileId == null
                ) return new Output { Code = 1, Message = "Parameter is not defined" };
            using (var repo = new GenericDal())
            return await repo.Post<Output>(user);
        }

        public async Task<List<User>> GetAvaiable()
        {
            using (var repo = new GenericDal())
            return await repo.GetListAsync<User>(new { IsActive = true });
        }

        public User GetById(int id)
        {
            using (var repo = new GenericDal())
            try { return repo.Search<User>(new { Id = id, IsActive = true }); }
            catch { return null; }
        }

        public Output Update(User user)
        {
            using (var repo = new GenericDal())
            {
                if (
                    user.Id <= 0 ||
                    user.UserName == null ||
                    user.FullName == null ||
                    user.ProfileId == null
                    ) return new Output { Code = 1, Message = "Parameter is not defined" };

                return repo.Update<Output>(user);
            }

        }

        // Oauth methods
        public bool IsExists(string userName)
        {
            try {
                using (var repo = new GenericDal())
                if (repo.Search<User>(new { UserName = userName })!=null)
                    return true;
                return false;
            }
            catch { return false; }
        }

        public User GetByUserName(string userName)
        {
            
            try {
                using (var repo = new GenericDal()) 
                return repo.Search<User>(new { UserName = userName, IsActive = true }); }
            catch { return null; }
        }
    }
}