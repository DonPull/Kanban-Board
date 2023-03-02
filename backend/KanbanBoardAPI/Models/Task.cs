using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace KanbanBoardAPI.Models
{
    public class Task
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public virtual Project Project { get; set; }
        public int BoardId { get; set; }
        [ForeignKey("BoardId")]
        public virtual Board Board { get; set; }
        public int ColumnId { get; set; }
        public virtual Column Column { get ; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int? OwnerId { get; set; }
        [ForeignKey("OwnerId")]
        public virtual User? Owner { get; set; }
        //public ICollection<User> Assignees { get; set; }
        public virtual ICollection<TaskAssignees>? TaskAssignees { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdateTime { get; set; }
        public DateTime Estimate { get; set; }
        public DateTime TimeRemainingBeforeDone { get; set; }

    }
}
