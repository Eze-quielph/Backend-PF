const postImage = require("./PostImage/CloudinaryConfig");
const postSound = require("./PostMusic/CloudinarySoundOne");
const fs = require("fs");

class UploadFile {
  constructor() {}

  uploadImage = async (image) => {
    return new Promise((resolve, reject) => {
      //console.log(image);
      postImage.uploader.upload(
        image,

        { resource_type: "image", folder: "/audiofiles", overwrite: true },
        (error, result) => {
          fs.unlink(image, (deleteErr) => {
            if (deleteErr) {
              console.error(
                "Error al eliminar el archivo temporal:",
                deleteErr.message
              );
            }

            if (error) {
              console.error(
                "Error al cargar el archivo en Cloudinary:",
                error.message
              );
              reject(error);
            } else {
              console.log(result.secure_url);
              console.log("Temp file was deleted " + result.secure_url);
              resolve(result.secure_url);
            }
          });
        }
      );
    });
  };

  uploadSound = async (sound) => {
    return new Promise((resolve, reject) => {
      postSound.uploader.upload(
        sound,
        { resource_type: "auto", folder: "/audiofiles", overwrite: true },
        (error, result) => {
          fs.unlink(sound, (deleteErr) => {
            if (deleteErr) {
              console.error(
                "Error al eliminar el archivo temporal:",
                deleteErr.message
              );
            }

            if (error) {
              console.error(
                "Error al cargar el archivo en Cloudinary:",
                error.message
              );
              reject(error);
            } else {
              console.log("Temp file was deleted " + result.secure_url);
              resolve(result.secure_url);
            }
          });
        }
      );
    });
  };
}

module.exports = UploadFile;
