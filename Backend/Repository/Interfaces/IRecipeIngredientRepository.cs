using Models.Entities;

namespace Repository.Interfaces
{
    public interface IRecipeIngredientRepository : IGenericRepository<RecipeIngredient>
    {
        Task<IEnumerable<RecipeIngredient>> GetByRecipeAsync(int recipeId);
    }
}
