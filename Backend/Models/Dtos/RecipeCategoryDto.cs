using Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Dtos
{
    [NotMapped]
    public class RecipeCategoryDto : BaseModelDto
    {
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
