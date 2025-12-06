import mongoose from 'mongoose';
import Usuario from './src/Modules/User/user.schema.js';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://user:secret@localhost:27017/Moltara?authSource=admin";

async function checkUsers() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB");
    
    const users = await Usuario.find({});
    console.log("Number of users:", users.length);
    users.forEach(u => {
        console.log(`User: ${u.email}, Role: ${u.role}, ID: ${u._id}`);
    });
    
  } catch(e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
}

checkUsers();
