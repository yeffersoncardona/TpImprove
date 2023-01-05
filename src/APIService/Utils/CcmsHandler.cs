using Domain.Entities.Util;
using Domain.Util;
using Newtonsoft.Json;
using RestSharp;

namespace APIService.Utils
{
    public static class CcmsHandler
    {
        public static async Task<Ccms> ccmsAuth(Access access)
        {
            string url = "https://ccmsautomated.teleperformance.co/login";
            RestClient client = new RestClient(url);

            RestRequest request = new RestRequest();

            request.AddJsonBody(access);

            RestResponse response = await client.ExecuteAsync(request, Method.Post);

            Ccms? ccmsResponse = JsonConvert.DeserializeObject<Ccms>(response.Content);

            return ccmsResponse;
        }
    }
}
