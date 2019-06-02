using System.Threading.Tasks;
using Server.Models;

namespace Server.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> IsUserExists(string username);
    }    
}
