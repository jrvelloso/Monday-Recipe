using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Dtos
{
    [NotMapped]
    public class DifficultyDto : BaseModelDto
    {
        public string Name { get; set; }
    }
}
