using System.ComponentModel.DataAnnotations;

namespace newProj.API.DTO
{
    public class UserDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}