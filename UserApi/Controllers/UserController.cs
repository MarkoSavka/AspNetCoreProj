using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClientService.Services;
using ClientService.Shared.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClientService.Shared.Data;
using ClientService.Shared.Models;
using Microsoft.AspNetCore.Authorization;

namespace UserApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly AdminUserService _adminUserService;
        private readonly JWTAuthentication _authentication;

        public UserController(MyDbContext context, AdminUserService adminUserService, JWTAuthentication authentication)
        {
            _context = context;
            _adminUserService = adminUserService;
            _authentication = authentication;
        }

        // GET: api/User
        [HttpGet]
        [Authorize(Roles = "Administrator,User")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _adminUserService.GetUsersAsync();
            return Ok(users);
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Administrator,User")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _adminUserService.GetUserAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/User/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel login)
        {
            // Retrieve the user from the database
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Name == login.Username);

            // Check if user exists and the password matches
            if (user != null && user.Password == login.Password)
            {
                var token = _authentication.GenerateToken(user);
                return Ok(new { Token = token });
            }

            return Unauthorized();
        }

        // POST: api/User/register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] User user)
        {
            // Validate user data (add your own validation logic here)
            if (string.IsNullOrEmpty(user.Name) || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Role))
            {
                return BadRequest("Invalid user data.");
            }

            // Save user to the database
            // if (user.Role == "User")
            // {
                _context.Users.Add(user);
            // }
            // else
            // {
            //     Admin admin = new()
            //     {
            //         Id = user.Id,
            //         Name = user.Name,
            //         Role = user.Role,
            //         Email = user.Email,
            //         Password = user.Password
            //     };
            //     
            //     _context.Admins.Add(admin);
            // }
            await _context.SaveChangesAsync();

            // Generate token for the user
            var token = _authentication.GenerateToken(user);
            return Ok(new { Token = token });
        }

        // private bool UserExists(int id)
        // {
        //     return _context.Users.Any(e => e.Id == id);
        // }
    }

    public class UserLoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}