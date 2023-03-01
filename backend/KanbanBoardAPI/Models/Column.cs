using Microsoft.EntityFrameworkCore.Metadata;

namespace KanbanBoardAPI.Models
{
    public class Column
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public Board? Board { get; set; }
        public virtual ICollection<Task>? Tasks { get; set; }
    }
}
