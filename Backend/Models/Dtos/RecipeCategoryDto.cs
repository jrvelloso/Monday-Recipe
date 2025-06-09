using Models.Dtos;
using Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [NotMapped]
    public class RecipeCategoryDto : BaseModelDto
    {
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
