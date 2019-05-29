using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using newProj.API.Models;

namespace newProj.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var Users = await _context.Users.Include(x => x.Photos).ToListAsync();
            return Users;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(x => x.Photos).FirstOrDefaultAsync(x => x.Id == id);
            return user;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}