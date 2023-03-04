namespace KanbanBoardAPI.Models
{
    public class Filters
    {
        public string FilterName { get; set; }
        public ICollection<Board> Boards { get; set; }
    }
}
