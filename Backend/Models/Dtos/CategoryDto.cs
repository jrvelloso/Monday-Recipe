using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Dtos
{
    [NotMapped]
    public class CategoryDto : BaseModelDto
    {
        public string Name { get; set; }
    }
}
