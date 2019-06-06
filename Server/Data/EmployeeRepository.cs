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
        public Task AddEmployee(Employee Emp)
        {
            Emp.YearOfJoining = DateTime.Now.Year;
            Emp.CreatedDate = DateTime.Now;
            _context.Add(Emp);
            return Task.CompletedTask;
        }

        public Task DeleteEmployee(Employee Emp)
        {
            Emp.IsDeleted = true;
            Emp.YearOfQuiting = DateTime.Now.Year;
            UpdateEmployee(Emp);
            return Task.CompletedTask;
        }

        public Task UpdateEmployee(Employee Emp)
        {
            Emp.ModifiedDate = DateTime.Now;
            _context.Update(Emp);
            return Task.CompletedTask;
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