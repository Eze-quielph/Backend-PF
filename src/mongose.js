const mongoose = require("mongoose");

const connectMongoose = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/chat", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo connect succefful");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectMongoose,
  mongoose,
};
