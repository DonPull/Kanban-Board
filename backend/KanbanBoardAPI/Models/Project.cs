using Microsoft.EntityFrameworkCore.Metadata;

namespace KanbanBoardAPI.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public User Owner { get; set; }
        public ICollection<ProjectParticipant> ProjectParticipants { get; set; }
        public ICollection<Board> Boards { get; set; }
        public ICollection<Task> Tasks { get; set; }
    }
}
