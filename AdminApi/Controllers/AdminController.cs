using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClientService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClientService.Shared.Data;
using ClientService.Shared.Models;
using Microsoft.AspNetCore.Authorization;

namespace AdminApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly AdminUserService _adminUserService;

        public AdminController(MyDbContext context,AdminUserService adminUserService)
        {
            _context = context;
            _adminUserService = adminUserService;
        }
        
        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            var updatedAdmin = await _adminUserService.PutUserAsync(id, user);

            if (updatedAdmin is null)
            {
                return NotFound();
            }
            return NoContent();
        }
        
        
        // [HttpPost]
        // public async Task<ActionResult<User>> PostUser(User user)
        // {
        //     _context.Users.Add(user);
        //     await _context.SaveChangesAsync();
        //     return user;
        //     // var createdUser = await _adminUserService.PostUserAsync(user);
        //     // return CreatedAtAction(nameof(PostUser), new { id = createdUser.Id }, createdUser);
        // }
        
        
        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var deletedAdmin = await _adminUserService.DeleteAdminAsync(id);

            if (deletedAdmin is null)
            {
                return NotFound();
            }
            return NoContent();
        }
        
        [Authorize(Roles = "Administrator")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser(User user)
        {
            var createdUser = await _adminUserService.PostUserAsync(user);

            if (createdUser is null)
            {
                return BadRequest();
            }
            return Ok(user);
        }
    }
}
