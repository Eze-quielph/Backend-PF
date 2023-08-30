const cloudinary = require('cloudinary').v2
require('dotenv').config();

const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env

//configure cloudnary || Agregar a un env los datos       
cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: CLOUD_KEY, 
  api_secret: CLOUD_SECRET 
});

const postSound= cloudinary

module.exports = postSound