using Azure.Core;
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
            project.UserId = request.UserId;
            //project.ProjectParticipants = request.ProjectParticipants

            project.JoinCode = ProjectCodeGenerator();

            _context.Add(project);
            await _context.SaveChangesAsync();

            var projectsList = await _context.Projects.ToListAsync();
            var projectId = projectsList.Find(p => p.Name == request.Name).Id;

            ProjectParticipant projectParticipant = new ProjectParticipant();
            projectParticipant.UserId = request.UserId;
            projectParticipant.ProjectId = projectId;

            _context.Add(projectParticipant);
            await _context.SaveChangesAsync();

             
            return Ok(project);
        }

        [HttpPost("join")]
        public async Task<ActionResult> JoinProject(JoinProjectDto request)
        {
            var projectsList = await _context.Projects.ToListAsync();
            var project = projectsList.Find(p => p.JoinCode == request.JoinProjectString);

            if (project == null)
            {
                return BadRequest("Invalid join code.");
            }

            var projectParticipant = new ProjectParticipant();
            projectParticipant.UserId = request.UserId;
            projectParticipant.ProjectId = project.Id;

            _context.Add(projectParticipant);
            await _context.SaveChangesAsync();

            return Ok(project.Id);
        }

        private string ProjectCodeGenerator() 
        {
            Random res = new Random();

            String str = "abcdefghijklmnopqrstuvwxyz0123456789";
            int size = 10;

            String randomstring = "";

            for (int i = 0; i < size; i++)
            {

                int x = res.Next(str.Length);

                randomstring = randomstring + str[x];
            }
            return (randomstring);
        }
    }
}
