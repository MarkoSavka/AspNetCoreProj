using ClientService;
using ClientService.Shared.Data;
using Microsoft.EntityFrameworkCore;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddDbContext<MyDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultCon"));
});
var host = builder.Build();
host.Run();
