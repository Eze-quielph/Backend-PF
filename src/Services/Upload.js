const postImage = require("./PostImage/CloudinaryConfig");
const fs = require("fs");

class UploadFile {
  constructor() {}

  uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
      postImage.uploader.upload(
        file,
        { resource_type: "image", folder: "/audiofiles", overwrite: true },
        (error, result) => {
          fs.unlink(file, (deleteErr) => {
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
              console.log("Temp file was deleted" + result.secure_url);
              resolve(result.secure_url);
            }
          });
        }
      );
    });
  };

  uploadSoundOne = async (sound) => {
    // Implementation for uploading sound one
  }

  uploadSoundTwo = async (sound) => {
    // Implementation for uploading sound two
  }
}

module.exports = UploadFile;
