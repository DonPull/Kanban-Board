using Microsoft.EntityFrameworkCore.Metadata;
using System.ComponentModel.DataAnnotations.Schema;

namespace KanbanBoardAPI.Models
{
    public class Board
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int BoardOwnerId { get; set; }
        public virtual User BoardOwner { get; set; }
        public int ProjectOriginId { get; set; }
        public virtual Project ProjectOrigin { get; set; }

        public virtual ICollection<Column>? Columns { get; set; }
        public virtual ICollection<Task>? Tasks { get; set; }
        public virtual ICollection<Filters>? Filters { get; set; }
        public virtual ICollection<BoardParticipant>? BoardParticipants { get; set; }
    }
}