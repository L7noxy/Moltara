using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpPost]
    public IActionResult CreateUser([FromBody] UserCreateModel model)
    {
        return CreatedAtAction(nameof(GetUser), new { id = 1 }, model);
    }
}