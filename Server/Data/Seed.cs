using System;
using System.Collections.Generic;
using System.Linq;
using Server.Models;
using Newtonsoft.Json;

namespace Server.Data
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
            if (!_context.Employees.Any())
            {
                var employeeJsonData = System.IO.File.ReadAllText("Data/employeeSeedData.json");
                var empData = JsonConvert.DeserializeObject<List<Employee>>(employeeJsonData);
                foreach (var employeInfo in empData)
                {
                    _context.Employees.Add(employeInfo);
                    _context.SaveChanges();
                }
            }
        }

    }
}