using KanbanBoardAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;
using Task = KanbanBoardAPI.Models.Task;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Column = KanbanBoardAPI.Models.Column;
using System.Web.Http.Validation;

namespace KanbanBoardAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserDto> UsersDto { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Board> Boards { get; set; }
        public DbSet<Column> Columns { get; set; }
        //public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<ProjectParticipant> ProjectParticipants { get; set; }
        public DbSet<TaskAssignees> TaskAssignees { get; set; }
        public DbSet<Filters> Filters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            

            modelBuilder.Entity<ProjectParticipant>()
                .HasKey(u => new { u.UserId, u.ProjectId });
            modelBuilder.Entity<ProjectParticipant>()
                .HasOne(u => u.User)
                .WithMany(p => p.ProjectParticipants)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<ProjectParticipant>()
                .HasOne(p => p.Project)
                .WithMany(p => p.ProjectParticipants)
                .HasForeignKey(p => p.ProjectId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<TaskAssignees>()
             .HasKey(u => new { u.UserId, u.TaskId });
            modelBuilder.Entity<TaskAssignees>()
                .HasOne(u => u.User)
                .WithMany(p => p.TaskAssignees)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<TaskAssignees>()
                .HasOne(p => p.Task)
                .WithMany(p => p.TaskAssignees)
                .HasForeignKey(p => p.TaskId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Task>()
                .HasOne(e => e.Owner)
                .WithMany()
                .HasForeignKey(e => e.OwnerId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Board>()
                .HasOne(e => e.Project)
                .WithMany()
                .HasForeignKey(e => e.ProjectId)
                .OnDelete(DeleteBehavior.NoAction);

            //modelBuilder.Entity<Filters>().OwnsOne(e => e.Board);
            

            //modelBuilder.Entity<Filters>().OwnsOne(x => x.Board);

            /* modelBuilder.Entity<Board>()
                 .HasOne(e => e.Filter)
                 .WithMany()
                 .HasForeignKey(e => e.FilterName)
                 .OnDelete(DeleteBehavior.NoAction);*/

            /*modelBuilder.Entity<Board>()
                .HasKey(u => new { u.Project, u.Filter });
            modelBuilder.Entity<Board>()
                .HasOne(e => e.Project)
                .WithMany(e => e.Boards)
                .HasForeignKey(e => e.ProjectId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Board>()
                .HasOne(p => p.Filter)
                .WithMany(e => e.Boards)
                .HasForeignKey(p => p.FilterName)
                .OnDelete(DeleteBehavior.NoAction);*/




            /*
            modelBuilder.Entity<Task>()
                .HasOne(e => e.Board)
                .WithMany()
                .HasForeignKey(e => e.BoardId)
                .OnDelete(DeleteBehavior.NoAction);
            */
            modelBuilder.Entity<Task>()
                .HasOne(e => e.Column)
                .WithMany()
                .HasForeignKey(e => e.ColumnId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
