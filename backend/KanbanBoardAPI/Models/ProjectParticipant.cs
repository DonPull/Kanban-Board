using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace KanbanBoardAPI.Models
{
    public class ProjectParticipant
    {
        public int UserId { get; set; }
        public int ProjectId { get; set; }

        //[Required]
        //[ForeignKey("Id")]
        public User User { get; set; }

        //[Required]
        //[ForeignKey("Id")]
        public Project Project { get; set; }
    }
}
