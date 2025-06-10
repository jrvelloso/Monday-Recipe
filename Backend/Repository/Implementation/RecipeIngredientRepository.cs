using Microsoft.EntityFrameworkCore;
using Models.Entities;
using Repository.Context;
using Repository.Interfaces;

namespace Repository.Implementation
{
    public class RecipeIngredientRepository : GenericRepository<RecipeIngredient>, IRecipeIngredientRepository
    {
        public RecipeIngredientRepository(DbContextRecipe context)
           : base(context) { }

        public async Task<IEnumerable<RecipeIngredient>> GetByRecipeAsync(int recipeId)
        {
            return await _context.Set<RecipeIngredient>()
                .Include(r => r.Ingredient)
                .Include(r => r.MeasurementType)
                .Where(r => r.RecipeId == recipeId)
                .ToListAsync();
        }
    }
}
