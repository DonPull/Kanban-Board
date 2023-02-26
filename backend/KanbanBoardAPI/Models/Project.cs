using Microsoft.EntityFrameworkCore.Metadata;

namespace KanbanBoardAPI.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public User OwnerId { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<Board> Boards { get; set; }
    }
}
