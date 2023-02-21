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

            return Ok(await _context.UsersDto.ToListAsync());
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> Get()
        {
            return Ok(_context.UsersDto.ToListAsync());
        }

    }
}
