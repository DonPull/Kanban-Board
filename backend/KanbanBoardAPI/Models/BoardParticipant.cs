namespace KanbanBoardAPI.Models
{
    public class BoardParticipant
    {
        public int UserId { get; set; }
        public virtual User? User { get; set; }
        public int BoardId { get; set; }
        public virtual Board? Board { get; set; }
    }
}
