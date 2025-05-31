using Models.Entities;

namespace Models.Mappers
{
    public class MeasurementTypeMapper
    {
        public static MeasurementTypeDto ToDto(MeasurementType entity)
        {
            if (entity == null)
                return null;

            return new MeasurementTypeDto
            {
                Id = entity.Id,
                Name = entity.Measurement,
                IsAtive = entity.IsAtive,
            };
        }
        public static IEnumerable<MeasurementTypeDto> ToDtos(IEnumerable<MeasurementType> entities)
        {
            if (entities == null)
                return Enumerable.Empty<MeasurementTypeDto>();

            return entities.Select(e => ToDto(e));
        }
        public static MeasurementType ToEntityAdd(MeasurementTypeDto entityDto)
        {
            if (entityDto == null)
                return null;

            return new MeasurementType
            {
                Measurement = entityDto.Name,
                IsAtive = entityDto.IsAtive,
            };
        }

        public static MeasurementType ToEntityUpdate(MeasurementTypeDto entityDto, MeasurementType entity)
        {
            if (entityDto == null)
                return null;

            entity.Measurement = entityDto.Name;
            entity.IsAtive = entityDto.IsAtive;
            return entity;
        }
    }
}
