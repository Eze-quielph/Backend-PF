const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.URL_MONGO;

const connectMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true, // Agrega esta opción
      useUnifiedTopology: true, // Agrega esta opción
    });
    console.log("Mongo connection successful");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = {
  connectMongoose,
  mongoose,
};
