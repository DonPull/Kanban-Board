using KanbanBoardAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace KanbanBoardAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserDto> UsersDto { get; set; }

    }
}
