using Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Text;
using System.Text.Json;
using System.Web;

namespace Business.Repositories
{
    public class ThirdPartyRepository : IThirdPartyRepository
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private string url;

        public ThirdPartyRepository(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            url = _configuration.GetSection("AzureFunctions").Value;
        }

        public async Task<T> GetAsync<T>(object? obj, string command) where T : class, new()
        {
            string query = string.Empty;
            if (obj != null)
                query = QueryBuilder(obj);
            var response = await _httpClient.GetAsync(url + command + query);
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(content);
        }

        public async Task<T> Post<T>(object obj, string command)
        {
            var content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(url + command, content);
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(responseContent);
        }

        private string QueryBuilder(object obj)
        {
            var queryString = HttpUtility.ParseQueryString("");
            var properties = obj.GetType().GetProperties();
            foreach (var prop in properties)
            {
                queryString[prop.Name] = prop.GetValue(obj)?.ToString();
            }

            return "?" + queryString.ToString();
        }
    }
}
