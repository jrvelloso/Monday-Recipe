using Models.Dtos;
using Models.Dtos.Request;

namespace Service.Interfaces
{
    public interface IRecipeService
    {
        Task<RecipeDto> AddAsync(RecipeRequest request);

        //Task ApproveRecipe(int id);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<RecipeDto>> GetAll();
        Task<RecipeDto> GetById(int entityId);
        Task<IEnumerable<RecipeDto>> GetPendingRecipes();
        Task<RecipeDto> Update(RecipeUpdate entityDto);
    }
}
