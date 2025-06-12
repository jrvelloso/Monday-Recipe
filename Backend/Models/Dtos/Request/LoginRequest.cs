using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Dtos.Request
{
    [NotMapped]
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

}
