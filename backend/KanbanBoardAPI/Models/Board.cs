using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations.Schema;

namespace KanbanBoardAPI.Models
{
    public class Board
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int ProjectId { get; set; }
        public virtual Project? Project { get; set; }
        public virtual ICollection<Column>? Columns { get; set; }
        public virtual ICollection<Task>? Tasks { get; set; }
        public virtual ICollection<Filters>? Filters { get; set; }
    }
}
