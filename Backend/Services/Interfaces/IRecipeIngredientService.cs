using Models;

namespace Service.Interfaces
{
    public interface IRecipeIngredientService
    {
        Task<RecipeIngredientDto> AddAsync(RecipeIngredientDto recipeIngredientDto);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<RecipeIngredientDto>> GetAll();
        Task<RecipeIngredientDto> GetById(int recipeIngredientId);
        Task<IEnumerable<RecipeIngredientDto>> GetByRecipe(int recipeId);
        Task<RecipeIngredientDto> Update(RecipeIngredientDto recipeIngredient);
    }
}
