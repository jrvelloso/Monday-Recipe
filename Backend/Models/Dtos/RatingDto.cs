using Models.Dtos;
using Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [NotMapped]
    public class RatingDto : BaseModelDto
    {
        public decimal RatingValue { get; set; }
        public int UserId { get; set; }
        public int RecipeId { get; set; }

        public User User { get; set; }
        public Recipe Recipe { get; set; }
    }
}
