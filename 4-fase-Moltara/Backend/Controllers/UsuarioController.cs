using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly MongoDBService _mongo;

        public UsuarioController(MongoDBService mongo)
        {
            _mongo = mongo;
        }

        [HttpPost("criar")]
        public async Task<IActionResult> Criar(Usuario usuario)
        {
            await _mongo.CreateUsuarioAsync(usuario);
            return Ok("Usuário criado!");
        }

        [HttpGet("listar")]
        public async Task<IActionResult> Listar()
        {
            var usuarios = await _mongo.GetUsuariosAsync();
            return Ok(usuarios);
        }
    }
}
