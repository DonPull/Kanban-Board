using KanbanBoardAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;
using Task = KanbanBoardAPI.Models.Task;

namespace KanbanBoardAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserDto> UsersDto { get; set; }
        public DbSet<Project> Projects { get; set; }
        //public DbSet<Board> Boards { get; set; }
        //public DbSet<Column> Columns { get; set; }
        //public DbSet<RefreshToken> RefreshTokens { get; set; }
        //public DbSet<Task> Tasks { get; set; }
        public DbSet<ProjectParticipant> ProjectParticipants { get; set; }

        
        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            modelBuilder.Entity<ProjectParticipant>()
                .HasKey(u => new { u.UserId, u.ProjectId });
            modelBuilder.Entity<ProjectParticipant>()
                .HasOne(u => u.User)
                .WithMany(p => p.ProjectParticipants)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);
            modelBuilder.Entity<ProjectParticipant>()
                .HasOne(p => p.Project)
                .WithMany(p => p.ProjectParticipants)
                .HasForeignKey(p => p.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull); 


        }
    }
}
