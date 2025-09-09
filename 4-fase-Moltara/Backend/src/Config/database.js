import { MongoClient } from "mongodb";

let db;

export async function connectDB(uri, dbName) {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log("✅ Conectado ao MongoDB:", dbName);
}

export function getDb() {
  if (!db) throw new Error("❌ Banco de dados não conectado!");
  return db;
}
