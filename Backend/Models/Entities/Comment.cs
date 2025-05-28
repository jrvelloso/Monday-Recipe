namespace Models.Entities
{
    public class Comment : BaseModel
    {
        public string Comments { get; set; }
        public int UsertId { get; set; }
        public int RecipeId { get; set; }
    }
}
