using Models;

namespace Service.Interfaces
{
    public interface ICommentService
    {
        Task<CommentDto> AddAsync(CommentDto entityDto);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<CommentDto>> GetAll();
        Task<CommentDto> GetById(int entityId);
        Task<IEnumerable<CommentDto>> GetByRecipe(int recipeId);
        Task<CommentDto> Update(CommentDto entityDto);
    }
}
