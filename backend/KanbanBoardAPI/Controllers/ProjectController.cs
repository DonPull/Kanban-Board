using Azure.Core;
using KanbanBoardAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

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
        public async Task<ActionResult<Project>> CreateProject(Dictionary<string, string> request)
        {
            var user = _context.Users.ToList().Find(u => u.Email == request["UserEmail"]);
            Project project = new Project();
            project.Name = request["Name"];
            project.UserId = user.Id;
            //project.ProjectParticipants = request.ProjectParticipants

            project.JoinCode = ProjectCodeGenerator();

            _context.Add(project);
            await _context.SaveChangesAsync();

            var userEmails = request["ProjectParticipantsEmails"].Split(",");

            var projectsList = await _context.Projects.ToListAsync();
            var projectId = projectsList.Find(p => p.Name == request["Name"]).Id;

            foreach (string userEmail in userEmails)
            {
                var userId = _context.Users.ToList().Find(u => u.Email == userEmail).Id;

                ProjectParticipant projectParticipant = new ProjectParticipant();
                projectParticipant.UserId = userId;
                projectParticipant.ProjectId = projectId;
                
                _context.Add(projectParticipant);
            }

            await _context.SaveChangesAsync();
             
            return Ok(project.Name);
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

            var user = _context.Users.ToList().Find(u => u.Email == request.UserEmail);

            if (user == null)
            {
                return BadRequest("Unexpected error occurred.");
            }

            var projectParticipant = new ProjectParticipant();
            projectParticipant.UserId = user.Id;
            projectParticipant.ProjectId = project.Id;

            _context.Add(projectParticipant);
            await _context.SaveChangesAsync();

            return Ok(project.Name);
        }

        [HttpPost("getProjects")]
        public async Task<ActionResult<Dictionary<string, List<Project>>>> GetProjects(string userEmail)
        {
            var users = await _context.Users.ToListAsync();
            var userId = users.Find(u => u.Email == userEmail).Id;

            List<Project> userProjects = new List<Project>();
            List<Project> userJoinedProjects = new List<Project>();
            

            List<Dictionary<string, string>> userProjectsDictList = new();
            List<Dictionary<string, string>> userJoinedProjectsDictList = new();

            var projectsList = await _context.Projects.ToListAsync();
            var projectParticipantsList = await _context.ProjectParticipants.ToListAsync();

            userProjects = projectsList.FindAll(p => p.UserId == userId);
            var joinedProjectsList = projectParticipantsList.FindAll(p => p.UserId == userId);
            var joinedProjectsIds = joinedProjectsList.Select(p => p.ProjectId).ToList();

            foreach(int projectId in joinedProjectsIds)
            {
                userJoinedProjects.Add(projectsList.Find(p => p.Id == projectId));
            }

            foreach(var p in userProjects)
            {
                Dictionary<string, string> userProjectsDict = new();
                userProjectsDict.Add("Name", p.Name);

                userProjectsDictList.Add(userProjectsDict);
            }
            foreach (var p in userJoinedProjects)
            {
                Dictionary<string, string> userJoinedProjectsDict = new();
                userJoinedProjectsDict.Add("Name", p.Name);

                userJoinedProjectsDictList.Add(userJoinedProjectsDict);
            }


            Dictionary<string, List<Dictionary<string, string>>> projects = new Dictionary<string, List<Dictionary<string, string>>>();
            projects.Add("OwnedProjects", userProjectsDictList);
            projects.Add("JoinedProjects", userJoinedProjectsDictList);

            return Ok(projects);
        }

        [HttpPost("getAccountsBySearch")]
        public List<Dictionary<string, string>> GetAccountsBySearch(string searchQuery)
        {
            var userList = _context.Users.ToList().FindAll(u => { return (u.FullName.Replace(" ", string.Empty).ToLower().Contains(searchQuery.Replace(" ", string.Empty).ToLower())); }).ToList();
            var userInfoList = new List<Dictionary<string, string>>();

            foreach(User user in userList)
            {
                var userInfoDict = new Dictionary<string, string>();
                userInfoDict.Add("FullName", user.FullName);
                userInfoDict.Add("Email", user.Email);

                userInfoList.Add(userInfoDict);
            }

            return userInfoList;
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
