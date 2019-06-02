using System.ComponentModel.DataAnnotations;

namespace Server.DTO
{
    public class UserDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}