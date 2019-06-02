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
        int GetEmployeeCount();
        void AddEmployee(Employee Emp);
        void UpdateEmployee(Employee Emp);
        void DeleteEmployee(Employee Emp);
        Task<bool> SaveAll();
    }
}