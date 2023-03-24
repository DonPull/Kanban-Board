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

        [HttpGet("get")]
        public async Task<ActionResult> GetBoardContent(int boardId)
        {
            var result = new List<Dictionary<object, object>>();

            var columns = _context.Columns.ToList().FindAll(c => c.BoardId == boardId).ToList();

            foreach(var column in columns)
            {
                var columnName = column.Name;
                var tasks = _context.Tasks.ToList().FindAll(t => t.ColumnRefId == column.Id).ToList();

                result.Add(new Dictionary<object, object>() { { "columnName", columnName }, { "tasks", tasks } } );
            }

            return Ok(result);
        }

        [HttpGet("getParticipants")]
        public async Task<ActionResult<List<string>>> GetBoardParticipants(int boardId)
        {
            var userIds = _context.BoardParticipants.ToList().FindAll(bp => bp.BoardId == boardId).Select(bp => bp.UserId).ToList();
            var users = _context.Users.ToList().FindAll(u => userIds.Contains(u.Id)).Select(u => { return (new Dictionary<string, string>{ ["Id"] = u.Id.ToString(), ["FullName"] = u.FullName, ["Email"] = u.Email, ["ProfilePicture"] = u.ProfilePicture }); }).ToList();
            return Ok(users);
        }
    }
}
