using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class Usuario
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("nome")]
        public string Nome { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("senha")]
        public string Senha { get; set; }
        
    }
}
