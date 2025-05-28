using Models.Entities;

namespace Models
{
    public class UserDto : BaseModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsRegisted { get; set; } = false;
        public bool IsAdmin { get; set; } = false;
        public virtual List<int> Favourites { get; set; }
        public virtual List<int> Recipes { get; set; }
    }
}
