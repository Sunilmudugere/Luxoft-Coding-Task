using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.DTO;
using Server.Helpers;
using Server.Models;
using Server.ViewModels;

namespace Server.Services
{
    public interface IEmployeeService
    {
        Task<EmployeeViewModel> GetEmployees(EmployeeDto emp);
        Task<EmployeeViewModel> SaveEmployee(EmployeeDto Emp);
        Task<EmployeeViewModel> DeleteEmployee(EmployeeDto Emp);
        Task<EmployeeStatistics> GetStatistics();
    }
}