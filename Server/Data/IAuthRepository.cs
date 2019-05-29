using System.Threading.Tasks;
using newProj.API.Models;

namespace newProj.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> IsUserExists(string username);
    }    
}
