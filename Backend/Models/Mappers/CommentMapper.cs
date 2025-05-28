using Models.Entities;

namespace Models.Mappers
{
    public class CommentMapper
    {
        public static CommentDto ToDto(Comment entity)
        {
            if (entity == null)
                return null;

            return new CommentDto
            {
                Id = entity.Id,
                Comments = entity.Comments,
                RecipeId = entity.RecipeId,
                UsertId = entity.UsertId,
                IsAtive = entity.IsAtive,
            };
        }
        public static IEnumerable<CommentDto> ToDtos(IEnumerable<Comment> entities)
        {
            if (entities == null)
                return Enumerable.Empty<CommentDto>();

            return entities.Select(e => ToDto(e));
        }
        public static Comment ToEntityAdd(CommentDto entityDto)
        {
            if (entityDto == null)
                return null;

            return new Comment
            {
                Comments = entityDto.Comments,
                RecipeId = entityDto.RecipeId,
                UsertId = entityDto.UsertId,
                IsAtive = entityDto.IsAtive,
            };
        }

        public static Comment ToEntityUpdate(CommentDto entityDto, Comment entity)
        {
            if (entityDto == null)
                return null;

            entity.Comments = entityDto.Comments;
            entity.RecipeId = entityDto.RecipeId;
            entity.UsertId = entityDto.UsertId;
            entity.IsAtive = entityDto.IsAtive;
            return entity;
        }
    }
}
