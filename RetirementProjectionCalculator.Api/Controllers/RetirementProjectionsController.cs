using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RetirementProjectionCalculator.Api.Data;
using RetirementProjectionCalculator.Api.Models;
using RetirementProjectionCalculator.Api.DTOs;

namespace RetirementProjectionCalculator.Api.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class RetirementProjectionsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public RetirementProjectionsController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/RetirementProjections/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<RetirementProjection>> Get(int id)
        {
            var projection = await _db.RetirementProjections
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (projection is null)
                return NotFound($"Projection with ID {id} not found.");

            return Ok(projection);
        }

        // GET: api/RetirementProjections/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<RetirementProjection>>> GetForUser(int userId)
        {
            var projections = await _db.RetirementProjections
                .Where(p => p.UserId == userId)
                .ToListAsync();

            return Ok(projections);
        }

        // POST: api/RetirementProjections
        [HttpPost]
        public async Task<ActionResult<RetirementProjection>> Create([FromBody] CreateProjectionDto dto)
        {
            var user = await _db.Users.FindAsync(dto.UserId);
            if (user is null)
                return BadRequest($"User with ID {dto.UserId} does not exist.");

            var (years, balances) = CalculateProjection(
                user.Age,
                dto.RetirementAge,
                dto.AnnualContribution,
                dto.ExpectedReturnRate
            );

            var projection = new RetirementProjection
            {
                UserId = dto.UserId,
                RetirementAge = dto.RetirementAge,
                AnnualContribution = dto.AnnualContribution,
                ExpectedReturnRate = dto.ExpectedReturnRate,
                Years = years,
                Balances = balances
            };

            _db.RetirementProjections.Add(projection);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = projection.Id }, projection);
        }

        private (List<int> years, List<decimal> balances) CalculateProjection(
            int currentAge,
            int retirementAge,
            decimal annualContribution,
            decimal expectedReturnRate)
        {
            var years = new List<int>();
            var balances = new List<decimal>();

            decimal balance = 0;

            for (int age = currentAge; age <= retirementAge; age++)
            {
                years.Add(age);
                balance = (balance + annualContribution) * (1 + expectedReturnRate);
                balances.Add(balance);
            }

            return (years, balances);
        }

        // DELETE: api/RetirementProjections/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var projection = await _db.RetirementProjections.FindAsync(id);
            if (projection is null)
            return NotFound($"Projection with ID {id} not found.");
            _db.RetirementProjections.Remove(projection);
            await _db.SaveChangesAsync();
            return NoContent();
        }
        
        // PUT: api/RetirementProjections/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateProjectionDto dto) {
            var projection = await _db.RetirementProjections.FindAsync(id);
            if (projection is null)
            return NotFound($"Projection with ID {id} not found.");

            var user = await _db.Users.FindAsync(dto.UserId);
            if (user is null)
            return BadRequest($"User with ID {dto.UserId} does not exist.");
            
            var (years, balances) = CalculateProjection(
                user.Age,
                dto.RetirementAge,
                dto.AnnualContribution,
                dto.ExpectedReturnRate
            );
            
            projection.RetirementAge = dto.RetirementAge;
            projection.AnnualContribution = dto.AnnualContribution;
            projection.ExpectedReturnRate = dto.ExpectedReturnRate;
            projection.Years = years;
            projection.Balances = balances;
            
        await _db.SaveChangesAsync();
        return NoContent();
        }
    }
}
