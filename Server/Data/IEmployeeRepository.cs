using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Helpers;
using Server.Models;

namespace Server.Data
{
    public interface IEmployeeRepository
    {
        Task<PagedList<Employee>> GetEmployees(int recordsPerPage, int pageNumber);
        Task AddEmployee(Employee Emp);
        Task UpdateEmployee(Employee Emp);
        Task DeleteEmployee(Employee Emp);

        IQueryable<Employee> GetEmployeesForStats();
        Task<bool> SaveAll();
    }
}