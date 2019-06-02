using System.Collections.Generic;
using Server.Models;
using Server.ViewModels;

namespace Server.DTO
{
    public class EmployeeDto
    {
        public Pagination Pagination { get; set; }
        public bool IsSortRequired { get; set; }
        public string SortByProperty { get; set; }
        public bool IsAscending { get; set; }
        public List<Employee> Employees { get; set; } 
    }
}