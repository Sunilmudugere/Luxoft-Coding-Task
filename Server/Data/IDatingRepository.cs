using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T:class;
         void Delete<T>(T entity) where T:class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetAllUsers();
         Task<User> GetUser(int id);
    }
}