using System.Linq;
using System.Threading.Tasks;
using Core.Entity.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    UserName ="Chung",
                    DisplayName = "Chung",
                    Email = "chung.lnt20062000@gmail.com",
                    Address = new Address
                    {
                        FirstName = "Chung",
                        LastName = "Le",
                        Street ="De To Hoang",
                        City = "Ha Noi",
                        State = "Hai Ba Trung",
                        Zipcode = "10000"
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}