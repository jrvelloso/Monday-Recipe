using Models.Entities;


namespace Repository.Interfaces
{
    public interface IRecipeRepository : IGenericRepository<Recipe>
    {
        Task<IEnumerable<Recipe>> GetAllIncluded();

        //Task ApproveRecipe(int recipeId);
        Task<IEnumerable<Recipe>> GetPendingRecipes();
    }
}
