using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations.Schema;

namespace KanbanBoardAPI.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        
        public int UserId { get; set; }
        public virtual User User { get; set; }
        //public ICollection<ProjectParticipant> ProjectParticipants { get; set; }
        public virtual ICollection<Board> Boards { get; set; }
        public virtual ICollection<ProjectParticipant> ProjectParticipants { get; set; }
        //public ICollection<Task> Tasks { get; set; }
    }
}
