using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Helpers;
using Server.Models;

namespace Server.Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Employee>> GetEmployees(int recordsPerPage, int pageNumber)
        {
            var employees = _context.Employees.Where(x => !x.IsDeleted);
            return await PagedList<Employee>.CreateAsync(employees,pageNumber,recordsPerPage);
        }
        public void AddEmployee(Employee Emp)
        {
            Emp.CreatedDate = DateTime.Now;
            _context.Add(Emp);
        }

        public void DeleteEmployee(Employee Emp)
        {
            Emp.IsDeleted = true;
            UpdateEmployee(Emp);
        }

        public void UpdateEmployee(Employee Emp)
        {
            Emp.ModifiedDate = DateTime.Now;
            _context.Update(Emp);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public IQueryable<Employee> GetEmployeesForStats()
        {
            return _context.Employees;
        }
    }
}