using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities
{
    public class User : BaseModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsRegisted { get; set; } = false;
        public bool IsAdmin { get; set; } = false;

        [NotMapped]
        public virtual List<int> Favourites { get; set; }
        [NotMapped]
        public virtual List<int> Recipes { get; set; }

    }
}
