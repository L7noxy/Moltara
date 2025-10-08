const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI)
      .then(() => console.log("MongoDB conectado"))
      .catch(err => console.error("Erro ao conectar no MongoDB:", err));

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;