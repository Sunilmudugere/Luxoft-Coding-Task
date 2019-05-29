using System.Collections.Generic;
using System.Linq;
using newProj.API.Models;
using Newtonsoft.Json;

namespace newProj.API.Data
{
    public class Seed
    {
        private DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUsers()
        {
            if(_context.Users.Any()){
            var UserJsonData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var UserData = JsonConvert.DeserializeObject<List<User>>(UserJsonData);

            foreach (var userInfo in UserData)
            {
                byte[] passwordHash;
                byte[] passwordSalt;
                CreateHashPassword("Apples", out passwordHash, out passwordSalt);
                userInfo.PasswordHash = passwordHash;
                userInfo.PasswordSalt = passwordSalt;
                userInfo.UserName = userInfo.UserName.ToLower();
                _context.Users.Add(userInfo);
                _context.SaveChanges();
            }
            }
        }

        private void CreateHashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF32.GetBytes(password));
            }
        }
    }
}