using ClientService.Shared.Data;
using ClientService.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Services;

public class AdminUserService
{
    private readonly MyDbContext _context;

    public AdminUserService(MyDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User> GetUserAsync(int id)
    {
        return await _context.Users.FindAsync(id) ?? null!;
    }

    public async Task<User> PutUserAsync(int id, User user)
    {
        if (id != user.Id) return null;

        _context.Entry(user).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(id))
                return null;
            else
                throw;
        }

        return user;
    }


    public async Task<User> PostUserAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }
    
    
    public async Task<User> DeleteAdminAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user is null)
        {
            return null;
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return user;
    }
    
    
    private bool UserExists(int id)
    {
        return _context.Users.Any(e => e.Id == id);
    }
}
