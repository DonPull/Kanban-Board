using Microsoft.EntityFrameworkCore.Metadata;

namespace KanbanBoardAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string ProfilePicture { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }
        public virtual ICollection<Project>? OwnedProjects { get; set; }
        public virtual ICollection<Board> OwnedBoards { get; set; }
        public virtual ICollection<ProjectParticipant>? ProjectParticipants { get; set; }
        public virtual ICollection<BoardParticipant>? BoardParticipants { get; set; }
        //public int TaskId { get; set; }
        //public virtual Task? Task { get; set; }
        public virtual ICollection<TaskAssignees>? TaskAssignees { get; set; }
        //public byte[] ImageData { get; set; }

    }
}
