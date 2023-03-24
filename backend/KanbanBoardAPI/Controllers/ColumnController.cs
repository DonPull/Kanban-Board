using KanbanBoardAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KanbanBoardAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColumnController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public ColumnController(IConfiguration configuration, DataContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("create")]
        public async Task<ActionResult<Column>> CreateBoard(Column request)
        {
            if(request.Name.Trim() == "")
            {
                return BadRequest("Please provide a name for your column!");
            }

            var column = new Column();

            column.Name = request.Name;
            column.BoardId = request.BoardId;

            _context.Add(column);
            await _context.SaveChangesAsync();

            return Ok(column);
        }
    }
}
