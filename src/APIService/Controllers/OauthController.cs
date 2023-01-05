using Business.Services;
using Domain.Entities;
using Domain.Entities.Util;
using Domain.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TP_Connection.Data.Crypto;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OauthController : ControllerBase
    {
        private UserBll userBll = new();

        [HttpPost("isExists")]
        public IActionResult IsExists([FromBody] Access access)
        {
            return Ok(userBll.IsExists(access.userName));
        }

        [HttpPost]
        public async Task<IActionResult> AuthorizeWidthCcms([FromBody] Access access)
        {
            User user = userBll.GetByUserName(access.userName);
            Ccms ccmsResponse = new Ccms();
            if (user != null) ccmsResponse = await Utils.CcmsHandler.ccmsAuth(access);

            if (user == null /*|| ccmsResponse.error.codError != "0000"*/)
                return Unauthorized();

            string key = CrypterDefault.Encrypt(Utils.SessionHandler.SetUser(user.Id, user.UserName));

            return Ok(new {
                user = new {
                    FullName = user.FullName,
                    Profile = user.ProfileName,
                    Permissions = user.Permissions,
                    key = key
                },
                access_token = Utils.JwtHandler.GenerateToken(user.Id, user.ProfileName),
                refresh_token = Utils.JwtHandler.GenerateRefreshToken(user.Id, key)
            });
        }

        [Authorize(AuthenticationSchemes = "AzureAd")]
        [HttpPost("azure")]
        public IActionResult AuthorizeWithAzure([FromBody] Access access)
        {

            User user = userBll.GetByUserName(access.userName);
            if (user == null) return Unauthorized();

            string key = CrypterDefault.Encrypt(Utils.SessionHandler.SetUser(user.Id, user.UserName));

            return Ok(new {
                user = new {
                    FullName = user.FullName,
                    Profile = user.ProfileName,
                    Permissions = user.Permissions,
                    key = key
                },
                access_token = Utils.JwtHandler.GenerateToken(user.Id, user.ProfileName),
                refresh_token = Utils.JwtHandler.GenerateRefreshToken(user.Id, key)
            });
        }

        [Authorize(AuthenticationSchemes = "refresh")]
        [HttpPost("refresh")]
        public IActionResult refresh()
        {
            int userId = int.Parse(User.FindFirst("UserId").Value);
            string key = User.FindFirst("Key").Value;
            string decryptKey = CrypterDefault.Decrypt(key);

            if (Utils.SessionHandler.IsSameKey(userId, decryptKey))
            {
                User user = userBll.GetById(userId);

                return Ok(new
                {
                    access_token = Utils.JwtHandler.GenerateToken(user.Id, user.ProfileName),
                    refresh_token = Utils.JwtHandler.GenerateRefreshToken(user.Id, key)
                });
            }

            return Unauthorized(new { Code = 401, Message = "You are login in other device" });
        }

        // dev authentication
        [HttpPost("dev")]
        public IActionResult GetAccess()
        {
            // return Ok(new { access_token = Utils.JwtHandler.GenerateToken(1, "Super Admin"), refresh_token = Utils.JwtHandler.GenerateRefreshToken(1, "key") });
            string key = CrypterDefault.Encrypt(Utils.SessionHandler.SetUser(1, "escobararenas.6"));
            return Ok(new
            {
                access_token = Utils.JwtHandler.GenerateToken(2, "Super Admin"),
                refresh_token = Utils.JwtHandler.GenerateRefreshToken(2, "key"),
                user = new
                {
                    FullName = "Dev User",
                    Profile = "Super Admin",
                    Permissions = "[]",
                    key = key
                },
            });
        }

        [HttpPost("logOut")]
        public IActionResult LogOut([FromBody] Access access)
        {
            Utils.SessionHandler.RemoveUser(access.userName);
            return Ok();
        }

        [HttpPost("removeUser")]
        public IActionResult RemoveUser([FromBody] Access access)
        {
            Utils.SessionHandler.RemoveUser(access.userName);
            return Ok();
        }
    }
}
