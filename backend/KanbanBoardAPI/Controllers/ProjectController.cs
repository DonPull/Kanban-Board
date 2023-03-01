using KanbanBoardAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KanbanBoardAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly DataContext _context;

        public ProjectController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public async Task<ActionResult<Project>> CreateProject(Project request)
        {
            Project project = new Project();
            project.Name = request.Name;
            project.User = request.User;
            //project.ProjectParticipants = request.ProjectParticipants;

            _context.Add(project);
            _context.SaveChangesAsync();

            return Ok(project);
        }
    }
}
