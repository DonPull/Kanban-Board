﻿using Microsoft.EntityFrameworkCore.Metadata;

namespace KanbanBoardAPI.Models
{
    public class Board
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<Column> Columns { get; set; }
        public Project ProjectIds { get; set; }
    }
}