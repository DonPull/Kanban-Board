using Azure.Core;
using KanbanBoardAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;

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
            projectParticipant.UserId = request.UserId; // fix this... here we add the owner as a participant but we should instead add all participants in a for loop
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

        [HttpPost("getProjects")]
        public async Task<ActionResult<List<Project>>> GetProjects(string userEmail)
        {
            var users = await _context.Users.ToListAsync();
            var userId = users.Find(u => u.Email == userEmail).Id;

            List<Project> userProjects = new List<Project>();
            var projectsList = await _context.Projects.ToListAsync();
            var projectParticipantsList = await _context.ProjectParticipants.ToListAsync();

            userProjects = projectsList.FindAll(p => p.UserId == userId);
            var joinedProjectsList = projectParticipantsList.FindAll(p => p.UserId == userId);
            var joinedProjectsIds = joinedProjectsList.Select(p => p.ProjectId).ToList();

            foreach(int projectId in joinedProjectsIds)
            {
                userProjects.Add(projectsList.Find(p => p.Id == projectId));
            }

            return Ok(userProjects);
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
