using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Dtos
{
    [NotMapped]
    public class MeasurementTypeDto : BaseModelDto
    {
        public string Measurement { get; set; }
    }
}
