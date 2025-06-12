namespace Models.Dtos.Request
{
    public class RecipeRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string PreparationTime { get; set; }
        public int CategoryId { get; set; }
        public int DifficultyId { get; set; }
        public int UserId { get; set; }
    }

}
