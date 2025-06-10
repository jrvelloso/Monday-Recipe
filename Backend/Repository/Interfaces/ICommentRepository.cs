using Models.Entities;

namespace Repository.Interfaces
{
    public interface ICommentRepository : IGenericRepository<Comment>
    {
        Task<Comment> GetByIdAll(int id);
        Task<IEnumerable<Comment>> GetByRecipeAsync(int recipeId);
    }
}
