using Microsoft.EntityFrameworkCore;
using Models.Entities;
using Repository.Context;
using Repository.Interfaces;

namespace Repository.Implementation
{
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository(DbContextRecipe context)
           : base(context) { }

        public async Task<IEnumerable<Comment>> GetByRecipeAsync(int recipeId)
        {
            return await _context.Set<Comment>()
                .Include(r => r.User)
                .Where(r => r.RecipeId == recipeId)
                .ToListAsync();
        }

        public async Task<Comment> GetByIdAll(int id)
        {
            return await _context.Set<Comment>()
                 .Include(x => x.Recipe)
                 .Include(x => x.User)
                 .FirstOrDefaultAsync(e => e.Id == id);
        }

    }
}
