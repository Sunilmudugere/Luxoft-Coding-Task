using System.Collections.Generic;

namespace Server.Models
{
    public class EmployeeStatistics
    {
        public int TotalEmployeeCount { get; set; }
        public int CurrentEmployeeCount { get; set; }
        public int DeletedEmployeeCount { get; set; }
        public int ModifiedEmployeeCount { get; set; }

        public List<int> YearList { get; set; } = new List<int>();
        public List<int> EmployeeAdded { get; set; }= new List<int>();
        public List<int> EmployeeDeleted { get; set; }= new List<int>();
    }
}