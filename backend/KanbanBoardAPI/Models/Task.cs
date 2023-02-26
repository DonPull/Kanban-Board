using Microsoft.EntityFrameworkCore.Metadata;

namespace KanbanBoardAPI.Models
{
    public class Task
    {
        public int Id { get; set; }
        public Project ProjectId { get; set; }
        public Board BoardId { get; set; }
        public Column ColumnId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public User CreatorId { get; set; }
        public ICollection<User> AssigneesID { get; set; }
        List<string> Filters = new List<string>();
        public DateTime CreatedDate { get; set; }
        public DateTime UpdateTime { get; set; }
        public DateTime Estimate { get; set; }
        public DateTime TimeRemainingBeforeDone { get; set; }

    }
}
