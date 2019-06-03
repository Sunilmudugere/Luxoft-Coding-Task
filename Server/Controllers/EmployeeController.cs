using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTO;
using Server.Services;
using Server.Helpers;
using Server.ViewModels;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _empService;

        public EmployeeController(IEmployeeService empService)
        {
            this._empService = empService;
        }
        // GET api/Employee
        [HttpPost("GetEmployees")]
        public async Task<IActionResult> GetEmployees(EmployeeDto emp)
        {
            return Ok(await _empService.GetEmployees(emp));
        }

        [HttpPost("SaveEmployees")]
        public async Task<IActionResult> SaveEmployees(EmployeeDto emp)
        {
            return Ok(await _empService.SaveEmployee(emp));
        }

        [HttpPost("DeleteEmployees")]
        public async Task<IActionResult> DeleteEmployees(EmployeeDto emp)
        {
            return Ok(await _empService.DeleteEmployee(emp));
        }

        [HttpGet("EmployeeStatistics")]
        public async Task<IActionResult> EmployeeStatistics(){
            return Ok(await _empService.GetStatistics());
        }

    }
}
