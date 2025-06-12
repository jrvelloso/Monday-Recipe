using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Dtos
{
    [NotMapped]
    public class IngredientDto : BaseModelDto
    {
        public string Name { get; set; }
    }
}
