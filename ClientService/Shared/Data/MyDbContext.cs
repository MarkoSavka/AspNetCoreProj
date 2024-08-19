using ClientService.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientService.Shared.Data;

public class MyDbContext:DbContext
{
    public MyDbContext(DbContextOptions opt):base(opt)
    {
        Database.EnsureCreated();
    }
    public DbSet<User> Users { get; set; }
    //public DbSet<Admin> Admins { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Name = "John Doe",
                Role = "User",
                Email = "john.doe@example.com",
                PhoneNumber = "0975634341",
                Password = "password123"
            },
            new User
            {
                Id = 2,
                Name = "Marko Polo",
                Role = "User",
                Email = "marko.s@example.com",
                PhoneNumber = "0996784521",
                Password = "password123"
            }
        );

        // modelBuilder.Entity<Admin>().HasData(
        //     new Admin
        //     {
        //         Id = 1,
        //         Name = "Admin User",
        //         Role = "Administrator",
        //         Email = "admin@example.com",
        //         Password = "adminpassword"
        //     }
        // );
    }
}
