using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Business.Utils;
using Domain.Enums;
using Microsoft.Extensions.Logging;
using System.Globalization;
using System.Text;
using System.Text.Json;

namespace Business.CacheService;

public class BlobStorageService
{
    private readonly ILogger<BlobStorageService> _logger;
    private readonly string _connetionString;
    private readonly BlobContainerClient _container;
    public BlobStorageService(ILogger<BlobStorageService> logger)
    {
        try
        {
            _logger = logger;
            _connetionString = DBUtilities.GetConnectionString("BlobConnection");
            _container = new BlobContainerClient(_connetionString, "blobstorage");
        }catch(Exception ex)
        {
            _logger = logger;
            _logger.LogError("BlobStorageService Cannot Start::" + ex.Message, ex);
        }
    } 


    private Dictionary<Type, Func<object, string>> formatters = new(){
        { typeof(DateTime), value => $"{GetDateString((DateTime)value)}" },
        { typeof(Guid), value => $"{value}" },
        { typeof(bool), value => $"{value}" },
        { typeof(int), value => $"{value}" },
        { typeof(long), value => $"{value}" },
        { typeof(string), value => $"{value}" },
    };
    private static string GetDateString(DateTime date) => date.ToString("ddMMyyyy", CultureInfo.InvariantCulture);

    public async Task GenerateBlob(object obj, string filename, Blobs blob)
    {
        try
        {
            var connectionString = DBUtilities.GetConnectionString("BlobConnection");
            BlobContainerClient container = new BlobContainerClient(connectionString, "blobstorage");

            using (MemoryStream fileStream = new MemoryStream())
            {
                var content = Encoding.ASCII.GetBytes(JsonSerializer.Serialize(obj));
                // Write the contents of the file to the MemoryStream
                // (You can use any method you like to populate the stream, such as reading from a file on disk or generating the contents programmatically)
                fileStream.Write(content, 0, content.Length);
                fileStream.Position = 0;
                container.CreateIfNotExists();
                string folderName = $"{blob}/";
                BlobClient blobClient = container.GetBlobClient(folderName + filename +".json");

                // Upload the file to the folder
                await blobClient.UploadAsync(fileStream);
                _logger.LogInformation($"Success file: {filename} in blobStorage.");
            }
        }
        catch(Exception ex) 
        {
            _logger.LogError(ex.Message, ex);
            Console.WriteLine(ex.Message);
        }

    }

    public async Task<T?> FindInBlob<T>(string filename, Blobs blob) where T: class
    {
        try
        {
            string folderName = $"{blob}/";
            BlobClient blobClient = _container.GetBlobClient(folderName + filename + ".json");
            if(await blobClient.ExistsAsync())
            {
                using (Stream stream = await blobClient.OpenReadAsync())
                {
                    return await JsonSerializer.DeserializeAsync<T>(stream);
                }
            }
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, ex);
            Console.WriteLine(ex.Message);
            return null;
        }
    }

    public string GenerateFileName(object typeObject)
    {
        try
        {
            Type type = typeObject.GetType();
            var sb = new StringBuilder();
            var properties = type.GetProperties();
            foreach (var prop in properties.Select((value, i) => new { i, value }))
            {
                Func<object, string> formatter = formatters.ContainsKey(prop.value.PropertyType) ?
                    formatters[prop.value.PropertyType] : value => value.ToString();
                if (prop.i < properties.Length - 1)
                    sb.Append($"{formatter(prop.value.GetValue(typeObject))}-");
                else
                    sb.Append($"{formatter(prop.value.GetValue(typeObject))}");
            }
            return sb.ToString();
        }catch(Exception ex)
        {
            _logger.LogError(ex.Message, ex);
            Console.WriteLine(ex.Message);
            return null;
        }

    }

}
