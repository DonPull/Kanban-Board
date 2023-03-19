using KanbanBoardAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Task = KanbanBoardAPI.Models.Task;

namespace KanbanBoardAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly DataContext _context;

        public TaskController(DataContext context)
        {
            _context = context;
        }

        /*[HttpPost("create")]

        public async Task<ActionResult<Task>> CreateTask(Task request) 
        {
            Task task = new Task();
            task.ProjectId = request.ProjectId;
            task.BoardId = request.BoardId;
            task.ColumnId = request.ColumnId;
            task.Title = request.Title;
            task.Description = request.Description;
            task.Type = request.Type;
            task.Priority = request.Priority;
            task.Status = request.Status;
            task.OwnerId = request.OwnerId;
            task.CreatedDate = request.CreatedDate;
            task.UpdateTime = request.UpdateTime;
            task.Estimate = request.Estimate;
            task.TimeRemainingBeforeDone = request.TimeRemainingBeforeDone;

            _context.Add(task);
            var result = await _context.SaveChangesAsync();
            return Ok(result);
        }*/
    }
}
