const cloudinary = require('cloudinary').v2
require('dotenv').config();

const { CLOUD_NAME_IMAGE, CLOUD_KEY_IMAGE, CLOUD_SECRET_IMAGE } = process.env

//configure cloudnary || Agregar a un env los datos       
cloudinary.config({ 
  cloud_name: CLOUD_NAME_IMAGE, 
  api_key: CLOUD_KEY_IMAGE, 
  api_secret: CLOUD_SECRET_IMAGE 
});

const postImage = cloudinary;

module.exports = postImage