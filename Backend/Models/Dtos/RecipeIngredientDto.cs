using Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Dtos
{
    [NotMapped]
    public class RecipeIngredientDto : BaseModelDto
    {
        public int Amount { get; set; }
        public int MeasurementTypeId { get; set; }
        public int IngredientId { get; set; }
        public int RecipeId { get; set; }
        public MeasurementType MeasurementType { get; set; }
        public Ingredient Ingredient { get; set; }
        public Recipe Recipe { get; set; }
    }
}
