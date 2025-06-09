namespace Models.Entities
{
    public class Recipe : BaseModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string PreparationTime { get; set; }
        public int CategoryId { get; set; }
        public int DifficultyId { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; } = "Pending";
        public Category Category { get; set; }
        public Difficulty Difficulty { get; set; }
        public User User { get; set; }

    }
}
