﻿using Models.Entities;

namespace Models
{
    public class CommentDto : BaseModel
    {
        public string Comments { get; set; }
        public int UsertId { get; set; }
        public int RecipeId { get; set; }
    }
}
