using KanbanBoardAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
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

        [HttpPost("create")]
        public async Task<ActionResult<Task>> CreateTask(Task request) 
        {
            Task task = new Task();
            task.ProjectRefId = request.ProjectRefId;
            task.BoardRefId = request.BoardRefId;
            task.ColumnRefId = request.ColumnRefId;
            task.Title = request.Title;
            task.Description = request.Description;
            task.Type = request.Type;
            task.Priority = request.Priority;
            task.Status = request.Status;
            task.OwnerRefId = request.OwnerRefId;
            task.Estimate = request.Estimate;
            task.TimeRemainingBeforeDone = request.TimeRemainingBeforeDone;

            var currentDateString = DateTime.Now.ToString("dd/MM/yyyy");
            DateTime dateTime = DateTime.ParseExact(currentDateString, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            task.CreatedDate = dateTime;
            task.UpdateTime = dateTime;

            _context.Add(task);
            var result = await _context.SaveChangesAsync();
            return Ok(result);
        }

        [HttpPost("addTaskAssignees")]
        public async Task<ActionResult> AddTaskAssignees(Dictionary<int, List<int>> request)
        {
            foreach (KeyValuePair<int, List<int>> entry in request)
            {
                foreach (int taskAssigneeId in entry.Value)
                {
                    var newTaskAssignee = new TaskAssignees();
                    newTaskAssignee.TaskId = entry.Key;
                    newTaskAssignee.UserId = taskAssigneeId;

                    _context.Add(newTaskAssignee);
                    await _context.SaveChangesAsync();
                }
            }

            return Ok();
        }
    }
}
