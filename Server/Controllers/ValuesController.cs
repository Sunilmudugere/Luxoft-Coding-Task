using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using newProj.API.Data;

namespace newproj.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;

        public ValuesController(DataContext context)
        {
            this._context = context;
        }
        // GET api/values
                [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> Get()
        {
            return Ok(await _context.Values.ToListAsync());
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get(int id)
        {
            return Ok(await _context.Values.Where(x=>x.Id == id).FirstOrDefaultAsync());
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
