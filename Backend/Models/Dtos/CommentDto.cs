using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Dtos
{
    [NotMapped]
    public class CommentDto : BaseModelDto
    {
        public string Comments { get; set; }
        public int UserId { get; set; }
        public int RecipeId { get; set; }
        public string UserName { get; set; }
        //public Recipe Recipe { get; set; }
    }
}
