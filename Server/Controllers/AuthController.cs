using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using newProj.API.Data;
using newProj.API.DTO;
using newProj.API.Models;

namespace newProj.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthRepository _authRepository { get; set; }
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository authRepository, IConfiguration config)
        {
            _config = config;
            _authRepository = authRepository;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(UserDto userToCreateDto)
        {
            userToCreateDto.UserName = userToCreateDto.UserName.ToLower();
            if (await _authRepository.IsUserExists(userToCreateDto.UserName))
            {
                return BadRequest("User already exists");
            }
            var userToCreate = new User() { UserName = userToCreateDto.UserName };
            var createdUser = _authRepository.Register(userToCreate, userToCreateDto.Password);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(UserDto loginCreds)
        {
            var userDetails = await _authRepository.Login(loginCreds.UserName.ToLower(), loginCreds.Password);
            if (userDetails == null)
                return Unauthorized();
            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier,userDetails.Id.ToString()),
                new Claim(ClaimTypes.Name,userDetails.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.
            GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                SigningCredentials = creds,
                Expires = DateTime.Now.AddHours(1),
                Subject = new ClaimsIdentity(claims)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new { token = tokenHandler.WriteToken(token)});
        }
    }
}