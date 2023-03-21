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
        public DbSet<BoardParticipant> BoardParticipants { get; set; }
        public DbSet<TaskAssignees> TaskAssignees { get; set; }
        public DbSet<Filters> Filters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            modelBuilder.Entity<Project>()
                .HasMany(p => p.Boards)
                .WithOne(b => b.ProjectOrigin)
                .HasForeignKey(b => b.ProjectOriginId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Board>()
                .HasOne(me => me.ProjectOrigin)
                .WithMany(parent => parent.Boards)
                .HasForeignKey(me => me.ProjectOriginId)
                .HasConstraintName("FK_Boards_Projects_ProjectOriginId");

            modelBuilder.Entity<Board>()
                .HasOne(me => me.Owner)
                .WithMany(parent => parent.OwnedBoards)
                .HasForeignKey(me => me.OwnerId)
                .HasConstraintName("FK_Boards_Users_BoardOwnerId");

            modelBuilder.Entity<ProjectParticipant>()
    .           HasKey(u => new { u.UserId, u.ProjectId });
            modelBuilder.Entity<ProjectParticipant>()
                .HasOne(u => u.User)
                .WithMany(p => p.ProjectParticipants)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<ProjectParticipant>()
                .HasOne(p => p.Project)
                .WithMany(p => p.ProjectParticipants)
                .HasForeignKey(p => p.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            /*modelBuilder.Entity<BoardParticipant>()
                .HasKey(u => new { u.UserId, u.BoardId });
            modelBuilder.Entity<BoardParticipant>()
                .HasOne(u => u.User)
                .WithMany(p => p.BoardParticipants)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<BoardParticipant>()
                .HasOne(p => p.Board)
                .WithMany(p => p.BoardParticipants)
                .HasForeignKey(p => p.BoardId)
                .OnDelete(DeleteBehavior.Cascade);*/

            modelBuilder.Entity<BoardParticipant>()
                .HasKey(bp => new { bp.UserId, bp.BoardId });

            modelBuilder.Entity<BoardParticipant>()
                .HasOne(bp => bp.User)
                .WithMany(u => u.BoardParticipants)
                .HasForeignKey(bp => bp.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BoardParticipant>()
                .HasOne(bp => bp.Board)
                .WithMany(b => b.BoardParticipants)
                .HasForeignKey(bp => bp.BoardId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TaskAssignees>()
                .HasKey(u => new { u.UserId, u.TaskId });
            modelBuilder.Entity<TaskAssignees>()
                .HasOne(u => u.User)
                .WithMany(p => p.TaskAssignees)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TaskAssignees>()
                .HasOne(p => p.Task)
                .WithMany(p => p.TaskAssignees)
                .HasForeignKey(p => p.TaskId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Board>()
                .Property<int>(b => b.OwnerId);
            modelBuilder.Entity<Board>()
                .Property<int>(b => (int)b.ProjectOriginId);

            modelBuilder.Entity<Board>()
                .HasOne(e => e.Owner)
                .WithMany(u => u.OwnedBoards)
                .HasForeignKey(e => e.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Board>()
                .HasOne(e => e.ProjectOrigin)
                .WithMany(p => p.Boards)
                .HasForeignKey(e => e.ProjectOriginId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Task>()
                .HasOne(e => e.Owner)
                .WithMany()
                .HasForeignKey(e => e.OwnerRefId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Task>()
              .HasOne(e => e.Column)
              .WithMany()
              .HasForeignKey(e => e.ColumnRefId)
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

        }
    }
}
