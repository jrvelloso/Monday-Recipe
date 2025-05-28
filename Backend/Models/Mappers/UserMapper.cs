using Models.Entities;

namespace Models.Mappers
{
    public static class UserMapper
    {
        public static UserDto ToDto(User entity)
        {
            if (entity == null)
                return null;

            return new UserDto
            {
                Id = entity.Id,
                Name = entity.Name,
                Email = entity.Email,
                Favourites = entity.Favourites,
                IsAdmin = entity.IsAdmin,
                IsAtive = entity.IsAtive,
                IsRegisted = entity.IsRegisted,
                Recipes = entity.Recipes,
            };
        }

        public static IEnumerable<UserDto> ToDtos(IEnumerable<User> entities)
        {
            if (entities == null)
                return Enumerable.Empty<UserDto>();

            return entities.Select(e => ToDto(e));
        }

        public static User ToEntityAdd(UserDto entityDto)
        {
            if (entityDto == null)
                return null;

            return new User
            {
                Name = entityDto.Name,
                Email = entityDto.Email,
                Favourites = entityDto.Favourites,
                IsAdmin = entityDto.IsAdmin,
                IsAtive = entityDto.IsAtive,
                IsRegisted = entityDto.IsRegisted,
                Recipes = entityDto.Recipes,
            };
        }

        public static User ToEntityUpdate(UserDto entityDto, User entity)
        {
            if (entityDto == null)
                return null;

            entity.Name = entityDto.Name;
            entity.Email = entityDto.Email;
            entity.Favourites = entityDto.Favourites;
            entity.IsAdmin = entityDto.IsAdmin;
            entity.IsAtive = entityDto.IsAtive;
            entity.IsRegisted = entityDto.IsRegisted;
            entity.Recipes = entityDto.Recipes;
            return entity;
        }
    }
}
