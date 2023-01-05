using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TP_Connection.Data.Crypto;

namespace APIService.Utils
{
    public static class TokenLifetimeValidator
    {
        public static bool Validate(DateTime? notBefore, DateTime? expires, SecurityToken tokenToValidate, TokenValidationParameters @param)
        {
            return (expires != null && expires > DateTime.UtcNow);
        }
    }

    public static class JwtHandler
    {
        private static string GetSecretKey(string key)
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return CrypterDefault.Decrypt(builder.Build().GetSection("Jwt").GetSection(key).Value);
        }

        public static string GenerateToken(int? userId, string? role)
        {
            ClaimsIdentity claims = new ClaimsIdentity();
            claims.AddClaim(new Claim("userId", Convert.ToString(userId)));
            claims.AddClaim(new Claim(ClaimTypes.Role, role));

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
            {
                Issuer = String.Empty,
                Audience = String.Empty,
                Subject = claims,
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(GetSecretKey("SecretKey"))), SecurityAlgorithms.HmacSha256Signature)
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken createdToken = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(createdToken);
        }

        public static string GenerateRefreshToken(int? userId, string? key)
        {
            ClaimsIdentity claims = new ClaimsIdentity();
            claims.AddClaim(new Claim("userId", Convert.ToString(userId)));
            claims.AddClaim(new Claim("Key", key));

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
            {
                Issuer = String.Empty,
                Audience = String.Empty,
                Subject = claims,
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(GetSecretKey("SecretRefreshKey"))), SecurityAlgorithms.HmacSha256Signature)
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken createdToken = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(createdToken);
        }
    }
}
