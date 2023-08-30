const { SongsControllers } = require("../Controllers/index.controllers");
const UploadFile = require("../Services/Upload");

const songController = new SongsControllers();
const uploadFIle = new UploadFile();

class SongsHandler {
  constructor() {}

  getSong = async (req, res) => {
    const { name } = req.query;

    if (name) {
      try {
        const result = await songController.getByName(name);
        res.status(200).json({ result: result });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      try {
        const result = await songController.getAll();
        res.status(200).json({ result: result });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  getById = async (req, res) => {
    const { id } = req.params;

    try {
      const result = await songController.getById(id);
      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateSong = async (req, res) => {
    const { name, description, artist, genre } = req.body;
    const { id } = req.params;

    const file = req.file;
    const imagePath = file.path;

    try {
      if (imagePath) {
        // Sube la imagen a Cloudinary y espera la respuesta
        const data = await uploadFIle.uploadImage(imagePath);
        console.log(data);
        // Si hay un error en la subida, usa la ruta local
        const newImage = data.error ? imagePath : data;

        // Llama a songController para actualizar la canción
        const result = await songController.updateSong(
          id,
          name,
          description,
          artist,
          genre,
          newImage
        );

        res.status(200).json({ result: result });
      } else {
        // Si no se proporcionó una nueva imagen, actualiza sin cambiar la imagen
        const result = await songController.updateSong(
          id,
          name,
          description,
          artist,
          genre
        );

        res.status(200).json({ result: result });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = SongsHandler;
