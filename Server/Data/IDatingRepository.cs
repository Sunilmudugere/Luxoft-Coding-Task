using System.Collections.Generic;
using System.Threading.Tasks;
using newProj.API.Models;

namespace newProj.API.Data
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