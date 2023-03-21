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
        public async Task<ActionResult<Board>> CreateBoard(Dictionary<string, string> request)
        {
            var user = _context.Users.ToList().Find(u => u.Email == request["UserEmail"]);

            if (user == null)
            {
                return BadRequest("Something went wrong. Please try again later!");
            }
            else if (request["Name"].Trim() == "")
            {
                return BadRequest("Board name cannot be empty. Please give your new board a name.");
            }

            Board board = new Board();
            board.Name = request["Name"];
            board.OwnerId = user.Id;
            board.ProjectOriginId = Int32.Parse(request["ProjectId"]);

            _context.Add(board);
            await _context.SaveChangesAsync();

            var userEmails = request["BoardParticipantsEmails"].Split(",");

            var boardsList = await _context.Boards.ToListAsync();
            var boardId = boardsList.Find(b => b.Name == request["Name"]).Id;

            foreach (string userEmail in userEmails)
            {
                var participant = _context.Users.ToList().Find(u => u.Email == userEmail);
                if (participant == null) //this enables a board to be created without any starting participants (they can be added later)
                {
                    continue;
                }

                var userId = participant.Id;

                BoardParticipant boardParticipant = new BoardParticipant();
                boardParticipant.UserId = userId;
                boardParticipant.BoardId = boardId;

                _context.Add(boardParticipant);
            }

            await _context.SaveChangesAsync();

            return Ok(board.Name);
        }
    }
}
