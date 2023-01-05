using Business.Repositories;
using Domain.Util;
using Bussiness.Exceptions;
using Domain.Interfaces;
using Domain.Enums;
using Domain.Entities;

namespace Business.Services
{
    public class ClientBll
    {
        private readonly ICacheService _cache;
        private readonly IThirdPartyRepository _functions;
        public ClientBll(ICacheService cache, IThirdPartyRepository functions)
        {
            _cache = cache;
            _functions = functions;
        }

        public List<Client> GetAll()
        {
            try { 
                using(var repo = new GenericDal())
                return repo.GetAll<Client>(); 
            }
            catch { return null; }
        }
        public Client GetById(int id)
        {
            try {
                using (var repo = new GenericDal()) 
                return repo.Search<Client>(new { Id = id, IsActive = true }); }
            catch { return null; }
        }
        public async Task<List<Client>> GetAvaiables()
        {
            using (var repo = new GenericDal())
            return await repo.GetListAsync<Client>(new { IsActive = true });
        }

        public async Task<Output> Create(Client client)
        {
            if (string.IsNullOrEmpty(client.Name))
                throw new ValidationException("You need  to scpecify name of the client.");


            var cosa = await _cache.FindInCache<Client>(
                new
                {
                    dateStart = DateTime.Now,
                    dateEnd = DateTime.Now,
                    kpi = 1235,
                    lob = 64365
                }, Blobs.Graphics);
            if (cosa == null)
                _cache.SaveInCache(client, new {date=DateTime.Now, Ref = Guid.Parse("648238b0-14bb-44eb-8d89-d3e77258ce41") }, Blobs.Graphics);
            return null;
        }

        public async Task<Example> Update(Client client)
        {
            var result = await _functions.GetAsync<Example>(new {name="holicrayoly"}, "HttpTrigger1");
            return result;
        }

        public class Example
        {
            public string test { get; set; }
            public DateTime date { get; set; }
        }
    }
}