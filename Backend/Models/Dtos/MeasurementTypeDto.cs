using Models.Dtos;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [NotMapped]
    public class MeasurementTypeDto : BaseModelDto
    {
        public string Name { get; set; }
    }
}
