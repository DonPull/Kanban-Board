using KanbanBoardAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KanbanBoardAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        private readonly DataContext _context;

        public BoardController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public async Task<ActionResult<Board>> CreateBoard(Board request) 
        {
            Board board = new Board();
            board.Name = request.Name;
            board.ProjectId = request.ProjectId;

            _context.Add(board);
            var result = await _context.SaveChangesAsync();
            return Ok(result);
        }
    }
}
