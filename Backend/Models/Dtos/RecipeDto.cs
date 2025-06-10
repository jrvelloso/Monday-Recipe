using Models.Dtos;
using Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [NotMapped]
    public class RecipeDto : BaseModelDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string PreparationTime { get; set; }
        public int CategoryId { get; set; }
        public int DifficultyId { get; set; }
        public int UserId { get; set; }
        public Category Category { get; set; }
        public Difficulty Difficulty { get; set; }
        public User User { get; set; }
        public string Status { get; set; }

    }
}
