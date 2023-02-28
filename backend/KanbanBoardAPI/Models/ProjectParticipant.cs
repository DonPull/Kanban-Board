namespace KanbanBoardAPI.Models
{
    public class ProjectParticipant
    {
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public User User { get; set; }
        public Project Project { get; set; }
    }
}
