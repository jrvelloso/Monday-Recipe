using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Dtos
{
    [NotMapped]
    public class BaseModelDto
    {
        public int Id { get; set; }
        public bool IsAtive { get; set; }
    }
}
