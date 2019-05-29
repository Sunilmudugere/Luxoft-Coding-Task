using Microsoft.EntityFrameworkCore;
using newProj.API.Models;

namespace newProj.API.Data
{
    public class DataContext : DbContext
    {
      
        public DataContext(DbContextOptions<DataContext> options): base(options){
Database.EnsureCreated();
        }
        public DbSet<Value> Values{get;set;}
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
    }
}