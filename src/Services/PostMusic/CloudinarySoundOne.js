const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const { CLOUD_NAME_SOUND, CLOUD_KEY_SOUND, CLOUD_SECRET_SOUND } = process.env;

//configure cloudnary || Agregar a un env los datos
cloudinary.config({
  cloud_name: CLOUD_NAME_SOUND,
  api_key: CLOUD_KEY_SOUND,
  api_secret: CLOUD_SECRET_SOUND,
});

const postSound = cloudinary;

module.exports = postSound;
