const { SongsControllers } = require("../Controllers/index.controllers");
const UploadFile = require("../Services/Upload");

const songController = new SongsControllers();
const uploadFIle = new UploadFile();

class SongsHandler {
  constructor() {}

  getSong = async (req, res) => {
    const { name } = req.query;

    try {
      const result = await songController.getAll();
      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getByName = async (req, res) => {
    const { name } = req.query;

    try {
      const result = await songController.getByName(name);
      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
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
    let newImage;
  
    try {
      if (file) {
        const imagePath = file.path;
        const data = await uploadFIle.uploadImage(imagePath);
        console.log(data);
        if (data.error) {
          newImage = imagePath;
        } else {
          newImage = data;
        }
      }
  
      const result = await songController.updateSong(
        id,
        name,
        description,
        artist,
        genre,
        newImage
      );
      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  postSound = async (req, res) => {
    const { name, description, artist, genre } = req.body;
    const files = req.files;
    console.log(files);
    try {
      const uploadedImage = await uploadFIle.uploadImage(
        req.files.image[0].path
      );
      const uploadedSound = await uploadFIle.uploadSound(
        req.files.sound[0].path
      );

      const image = uploadedImage;
      const song = uploadedSound;
      console.log(image, song);
      const result = await songController.postSong(
        name,
        description,
        artist,
        genre,
        image,
        song
      );

      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
module.exports = SongsHandler;
