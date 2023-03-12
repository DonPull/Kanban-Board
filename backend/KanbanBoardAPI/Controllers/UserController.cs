using KanbanBoardAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http.Cors;

namespace KanbanBoardAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        public UserController(DataContext context)
        {
            _context = context;
        }

        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]

        [HttpPost]
        public async Task<ActionResult<UserDto>> Post(UserDto request) 
        {
            UserDto userDto = new UserDto();
            userDto.FullName = request.FullName;
            userDto.Email = request.Email;
            userDto.Password = request.Password;

            var existingUser = _context.UsersDto.ToList().Find(e => e.Email == request.Email );

            if (existingUser != null)
            {
                return BadRequest("User already exists!");
            }

            _context.Add(userDto);
            var result = await _context.SaveChangesAsync();

            return Ok(userDto);
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> Get()
        {
            return Ok(_context.UsersDto.ToListAsync());
        }

        [HttpPut("updateProfilePicture")]
        public async Task<ActionResult<string>> UpdateProfilePicture(Dictionary<string, string> request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request["Email"]);
            
            if(user == null)
            {
                return BadRequest("User does not exist!");
            }

            user.ProfilePicture = request["ProfilePictureBase64"];
            _context.Attach(user);
            _context.Entry(user).Property(x => x.ProfilePicture).IsModified = true;

            var result = await _context.SaveChangesAsync();

            return Ok(request["ProfilePictureBase64"]);
        }

        [HttpPost("getUserInfo")]
        public async Task<ActionResult<Dictionary<string, string>>> GetUserInfo(string userEmail)
        {
            var user = _context.Users.ToList().Find(u => u.Email == userEmail);

            if(user == null)
            {
                return BadRequest("User does not exist!");
            }

            var userInfoDict = new Dictionary<string, string>();
            userInfoDict["fullName"] = user.FullName;
            userInfoDict["email"] = user.Email;
            userInfoDict["profilePicture"] = user.ProfilePicture;

            return Ok(userInfoDict);
        }

        [HttpPost("getUsersProfilePictures")]
        public async Task<ActionResult<Dictionary<string, string>>> GetUserInfo(List<string> userEmails)
        {
            List<string> userProfilePictures = new List<string>();
            _context.Users.ToList().ForEach(u => { if (userEmails.Contains(u.Email)) { userProfilePictures.Add(u.ProfilePicture); } });

            return Ok(userProfilePictures);
        }

    }
}
