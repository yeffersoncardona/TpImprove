using Business.Repositories;
using Domain.DTOs;
using Domain.Entities;

namespace Business.Services
{
    public sealed class MarketBLL 
    {
        public List<Market> GetMarkets()
        {
            using (var repo = new GenericDal())
            return repo.GetAll<Market>();
        }

        public List<ClientCampainDTO> GetClients(string MarketName)
        {
            using (var repo = new GenericDal())
            return repo.Getlist<ClientCampainDTO>(new { Market = MarketName }, "spGetClientByMarket");
        }
        public List<LOBDTO> GetLOB(int id)
        {
            using (var repo = new GenericDal())
            return repo.Getlist<LOBDTO>(new { Id = id }, "spGetLBOByClient");
        }
    }
}
