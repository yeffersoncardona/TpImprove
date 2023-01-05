using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TP_Connection.Data.Crypto;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EncriptController : ControllerBase
    {
        [HttpPost("encript")]
        public IActionResult Encript([FromBody] string data)
        {
            return Ok(CrypterDefault.Encrypt(data));
        }

        [HttpPost("decript")]
        public IActionResult Decript([FromBody] string data)
        {
            return Ok(CrypterDefault.Decrypt(data));
        }
    }
}
