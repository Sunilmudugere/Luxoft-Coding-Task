using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Data;
using Server.DTO;
using Server.Helpers;
using Server.Models;
using Server.ViewModels;

namespace Server.Services
{
    public class EmployeeService : IEmployeeService
    {
        private IEmployeeRepository _empRepository;
        public EmployeeService(IEmployeeRepository empRepository)
        {
            _empRepository = empRepository;
        }

        public Task<EmployeeViewModel> GetEmployees(EmployeeDto emp)
        {
            var employeeInfo = _empRepository.GetEmployees(emp.Pagination.ItemsPerPage, emp.Pagination.CurrentPage).Result;
            var empModel = new EmployeeViewModel(employeeInfo.dataList,employeeInfo.CurrentPage,employeeInfo.PageSize,employeeInfo.TotalCount,employeeInfo.TotalPages);
            return Task.FromResult<EmployeeViewModel>(empModel);
        }
        public Task<EmployeeViewModel> SaveEmployee(EmployeeDto Emp)
        {
            foreach (var employee in Emp.EmployeeList)
            {
                if (employee.Id == 0)
                {
                    _empRepository.AddEmployee(employee);
                }
                else
                {
                    _empRepository.UpdateEmployee(employee);
                }
            }
            _empRepository.SaveAll();

            return Task.Run(() => GetEmployees(Emp));
        }

        public Task<EmployeeViewModel> DeleteEmployee(EmployeeDto Emp)
        {
            foreach (var employee in Emp.EmployeeList)
            {
                _empRepository.DeleteEmployee(employee);
            }
            _empRepository.SaveAll();
            return Task.Run(() => GetEmployees(Emp));
        }
    }
}