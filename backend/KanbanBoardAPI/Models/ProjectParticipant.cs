using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace KanbanBoardAPI.Models
{
    public class ProjectParticipant
    {
        
        public int UserId { get; set; }
        public virtual User? User { get; set; }
        public int ProjectId { get; set; }
        public virtual Project? Project { get; set; }
        
        //public int Id { get; set; }
    }
}
