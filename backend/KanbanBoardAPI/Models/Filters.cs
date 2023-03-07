namespace KanbanBoardAPI.Models
{
    public class Filters
    {
        public int Id { get; set; }
        public string FilterName { get; set; }
        public int BoardId { get; set; }
        public virtual Board? Board { get; set; }
    }
}
