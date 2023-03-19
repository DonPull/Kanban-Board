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

            if(user == null)
            {
                return BadRequest("Something went wrong. Please try again later!");
            }else if(request["Name"].Trim() == "")
            {
                return BadRequest("Project name cannot be empty. Please give your new project a name.");
            }

            Project project = new Project();
            project.Name = request["Name"];
            project.UserId = user.Id;

            project.JoinCode = ProjectCodeGenerator();

            _context.Add(project);
            await _context.SaveChangesAsync();

            var userEmails = request["ProjectParticipantsEmails"].Split(",");

            var projectsList = await _context.Projects.ToListAsync();
            var projectId = projectsList.Find(p => p.Name == request["Name"]).Id;

            foreach (string userEmail in userEmails)
            {
                var participant = _context.Users.ToList().Find(u => u.Email == userEmail);
                if(participant == null) //this enables a project to be created without any starting participants (they can join later with the project join code)
                {
                    continue;
                }

                var userId = participant.Id;

                ProjectParticipant projectParticipant = new ProjectParticipant();
                projectParticipant.UserId = userId;
                projectParticipant.ProjectId = projectId;
                
                _context.Add(projectParticipant);
            }

            await _context.SaveChangesAsync();
             
            return Ok(project.Name);
        }

        [HttpGet("{projectId}")]
        public async Task<ActionResult> GetProjectById(int projectId)
        {
            var project = _context.Projects.ToList().Find(p => p.Id == projectId);

            if (project == null)
            {
                return BadRequest($"A project with the id of '{projectId}' does not exist!");
            }

            Dictionary<string, string> projectDto = new();
            projectDto["Id"] = project.Id.ToString();
            projectDto["OwnerId"] = project.UserId.ToString();
            projectDto["Name"] = project.Name;
            projectDto["JoinCode"] = project.JoinCode;


            return Ok(projectDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var projectToDelete = await _context.Projects
                .Include(p => p.Tasks)
                .Include(p => p.Boards)
                .Include(p => p.ProjectParticipants)
                .FirstOrDefaultAsync(p => p.Id == id);
            if (projectToDelete == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(projectToDelete);
            await _context.SaveChangesAsync();

            return Ok(projectToDelete);
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
            //var users = await _context.Users.ToListAsync();
            var users = _context.Users.ToList();
            var userId = users.Find(u => u.Email == userEmail).Id;

            List<Project> userProjects = new List<Project>();
            List<Project> userJoinedProjects = new List<Project>();
            

            List<Dictionary<string, string>> userProjectsDictList = new();
            List<Dictionary<string, string>> userJoinedProjectsDictList = new();

            /*var projectsList = await _context.Projects.ToListAsync();
            var projectParticipantsList = await _context.ProjectParticipants.ToListAsync();*/
            var projectsList = _context.Projects.ToList();
            var projectParticipantsList = _context.ProjectParticipants.ToList();

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
                userProjectsDict.Add("Id", p.Id.ToString());
                userProjectsDict.Add("Name", p.Name);

                List<string> userEmails = new List<string>();
                var userIdsOfParticipants = projectParticipantsList.FindAll(pp => pp.ProjectId == p.Id).Select(user => user.UserId).ToList();
                users.ForEach(u => {
                    if (userIdsOfParticipants.Contains(u.Id))
                    {
                        userEmails.Add(u.Email);
                    }
                });
                userProjectsDict.Add("ProjectParticipantsEmails", String.Join(",", userEmails));

                userProjectsDictList.Add(userProjectsDict);
            }
            foreach (var p in userJoinedProjects)
            {
                Dictionary<string, string> userJoinedProjectsDict = new();
                userJoinedProjectsDict.Add("Id", p.Id.ToString());
                userJoinedProjectsDict.Add("Name", p.Name);

                List<string> userEmails = new List<string>();
                var userIdsOfParticipants = projectParticipantsList.FindAll(pp => pp.ProjectId == p.Id).Select(user => user.UserId).ToList();
                users.ForEach(u => {
                    if (userIdsOfParticipants.Contains(u.Id))
                    {
                        userEmails.Add(u.Email);
                    }
                });
                userJoinedProjectsDict.Add("ProjectParticipantsEmails", String.Join(",", userEmails));

                userJoinedProjectsDictList.Add(userJoinedProjectsDict);
            }

            Dictionary<string, List<Dictionary<string, string>>> projects = new ();
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
                userInfoDict.Add("Id", user.Id.ToString());
                userInfoDict.Add("FullName", user.FullName);
                userInfoDict.Add("Email", user.Email);
                userInfoDict.Add("ProfilePicture", user.ProfilePicture);

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
