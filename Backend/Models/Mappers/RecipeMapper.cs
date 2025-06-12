using Models.Dtos;
using Models.Dtos.Request;
using Models.Entities;

namespace Models.Mappers
{
    public class RecipeMapper
    {
        public static RecipeDto ToDto(Recipe entity)
        {
            if (entity == null)
                return null;

            return new RecipeDto
            {
                Id = entity.Id,
                Description = entity.Description,
                Category = entity.Category,
                CategoryId = entity.CategoryId,
                Difficulty = entity.Difficulty,
                DifficultyId = entity.DifficultyId,
                PreparationTime = entity.PreparationTime,
                Title = entity.Title,
                User = entity.User,
                UserId = entity.UserId,
                IsAtive = entity.IsAtive,
                Status = entity.Status,
            };
        }

        public static Recipe FromDtoToCreate(RecipeRequest request)
        {
            if (request == null)
                return null;

            return new Recipe
            {
                Description = request.Description,
                CategoryId = request.CategoryId,
                DifficultyId = request.DifficultyId,
                PreparationTime = request.PreparationTime,
                Title = request.Title,
                UserId = request.UserId,
            };
        }
        public static IEnumerable<RecipeDto> ToDtos(IEnumerable<Recipe> entities)
        {
            if (entities == null)
                return Enumerable.Empty<RecipeDto>();

            return entities.Select(e => ToDto(e));
        }
        public static Recipe ToEntityAdd(RecipeDto entityDto)
        {
            if (entityDto == null)
                return null;

            return new Recipe
            {
                Description = entityDto.Description,
                Category = entityDto.Category,
                CategoryId = entityDto.CategoryId,
                Difficulty = entityDto.Difficulty,
                DifficultyId = entityDto.DifficultyId,
                PreparationTime = entityDto.PreparationTime,
                Title = entityDto.Title,
                User = entityDto.User,
                UserId = entityDto.UserId,
                IsAtive = entityDto.IsAtive,
                Status = entityDto.Status,
            };
        }
        public static Recipe ToEntityUpdate(RecipeDto entityDto, Recipe entity)
        {
            if (entityDto == null)
                return null;

            entity.Description = entityDto.Description;
            entity.Category = entityDto.Category;
            entity.CategoryId = entityDto.CategoryId;
            entity.Difficulty = entityDto.Difficulty;
            entity.DifficultyId = entityDto.DifficultyId;
            entity.PreparationTime = entityDto.PreparationTime;
            entity.Title = entityDto.Title;
            entity.User = entityDto.User;
            entity.UserId = entityDto.UserId;
            entity.IsAtive = entityDto.IsAtive;
            entity.Status = entityDto.Status;
            return entity;
        }

        public static Recipe FromDtoToUpdate(RecipeUpdate entityDto, Recipe entity)
        {
            if (entityDto == null)
                return null;

            entity.Description = entityDto.Description;
            entity.CategoryId = entityDto.CategoryId;
            entity.DifficultyId = entityDto.DifficultyId;
            entity.PreparationTime = entityDto.PreparationTime;
            entity.Title = entityDto.Title;
            entity.UserId = entityDto.UserId;
            return entity;
        }
    }
}
