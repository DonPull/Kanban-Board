using Microsoft.EntityFrameworkCore.Metadata;

namespace KanbanBoardAPI.Models
{
    public class Column
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public Board BroardId { get; set; }
        public ICollection<Task> Tasks { get; set; }
    }
}
