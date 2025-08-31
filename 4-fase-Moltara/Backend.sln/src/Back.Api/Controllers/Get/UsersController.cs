using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok(new { Message = "Lista de usuários" });
    }

    [HttpGet("{id}")]
    public IActionResult GetUser(int id)
    {
        return Ok(new { Message = $"Detalhes do usuário {id}" });
    }
}