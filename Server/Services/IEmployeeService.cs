using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Helpers;
using Server.Models;
using Server.ViewModels;

namespace Server.Services
{
    public interface IEmployeeService
    {
        Task<EmployeeViewModel> GetEmployees(Pagination emp);
        Task<bool> SaveEmployee(EmployeeViewModel Emp);
        Task<bool> DeleteEmployee(EmployeeViewModel Emp);
        Task<EmployeeStatistics> GetStatistics();
    }
}