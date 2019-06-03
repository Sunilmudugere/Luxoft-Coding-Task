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
            var empModel = new EmployeeViewModel(employeeInfo.dataList, employeeInfo.CurrentPage, employeeInfo.PageSize, employeeInfo.TotalCount, employeeInfo.TotalPages);
            return Task.FromResult<EmployeeViewModel>(empModel);
        }
        public Task<EmployeeViewModel> SaveEmployee(EmployeeDto Emp)
        {
            foreach (var employee in Emp.Employees)
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
            foreach (var employee in Emp.Employees.Where(x => x.Id != 0))
            {
                _empRepository.DeleteEmployee(employee);
            }
            _empRepository.SaveAll();
            return Task.Run(() => GetEmployees(Emp));
        }

        public Task<EmployeeStatistics> GetStatistics()
        {
            EmployeeStatistics stats = new EmployeeStatistics();
            var employees = _empRepository.GetEmployeesForStats();
            stats.CurrentEmployeeCount = employees.Where(x => x.IsDeleted != true).Count();
            stats.DeletedEmployeeCount = employees.Where(x => x.IsDeleted == true).Count();
            stats.ModifiedEmployeeCount = employees.Where(x => x.IsDeleted != true && x.ModifiedDate != null).Count();
            stats.TotalEmployeeCount = employees.Count();

            var AddedGroup = employees.GroupBy(x => x.YearOfJoining);
            foreach (var group in AddedGroup)
            {
                stats.YearList.Add(group.Key);
                stats.EmployeeAdded.Add(group.Count());
                stats.EmployeeDeleted.Add(group.Where(x => x.IsDeleted == true && x.ModifiedDate.Year == group.Key).Count());
            }

            var deletedGroup = employees.Where(x => x.IsDeleted == true).GroupBy(x => x.ModifiedDate.Year);
            foreach (var group in deletedGroup)
            {
                if (!stats.YearList.Any(x => x == group.Key))
                {
                    stats.YearList.Add(group.Key);
                    stats.EmployeeDeleted.Add(group.Where(x => x.IsDeleted == true && x.ModifiedDate.Year == group.Key).Count());
                }
            }
            return Task.FromResult<EmployeeStatistics>(stats);
        }
    }
}