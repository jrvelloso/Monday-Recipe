using Models.Dtos;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [NotMapped]
    public class CategoryDto : BaseModelDto
    {
        public string Name { get; set; }
    }
}
