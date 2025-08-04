using Backend.Models;
using MongoDB.Driver;

namespace Backend.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Usuario> _usuarios;

        public MongoDBService(IConfiguration config)
        {
            var client = new MongoClient(config["MongoDB:ConnectionString"]);
            var database = client.GetDatabase(config["MongoDB:Database"]);
            _usuarios = database.GetCollection<Usuario>("usuarios");
        }

        public async Task<List<Usuario>> GetUsuariosAsync() =>
            await _usuarios.Find(_ => true).ToListAsync();

        public async Task CreateUsuarioAsync(Usuario usuario) =>
            await _usuarios.InsertOneAsync(usuario);
    }
}
