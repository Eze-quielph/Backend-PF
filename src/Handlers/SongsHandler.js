const { SongsControllers } = require("../Controllers/index.controllers");
const UploadFile = require("../Services/Upload");

const songController = new SongsControllers();
const uploadFIle = new UploadFile();

const { client } = require("../Services/Redis/redis.config");

class SongsHandler {
  constructor() {}

  getSong = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    const { genre, artist } = req.query;

    try {
      let result;

      await client.get("songs", (err, reply) => {
        if (reply) {
          result = JSON.parse(reply);
        }
        console.log(err);
      });
      if (!genre && !artist) {
        result = await songController.getAll(page, perPage);
      } else {
        result = await songController.getAllFiltered(
          genre,
          artist,
          page,
          perPage
        );
      }

      await client.setEx("songs", 15000, JSON.stringify(result));
      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getByName = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    const { name, genre, artist } = req.query;

    try {
      let result;

      await client.get(`${name}`, (err, reply) => {
        if (reply) {
          result = JSON.parse(reply);
        }
        console.log(err);
      });
      if (!genre && !artist) {
        result = await songController.getByName(name, page, perPage);
      } else {
        result = await songController.getByNameFiltered(
          name,
          genre,
          artist,
          page,
          perPage
        );
      }

      await client.setEx(`${name}`, 15000, JSON.stringify(result));

      res.status(200).json({ result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getById = async (req, res) => {
    const { id } = req.params;

    try {
      let result;

      await client.get(`${id}`, (err, reply) => {
        if (reply) {
          result = JSON.parse(reply);
        }
        console.log(err);
      });

      result = await songController.getById(id);

      await client.setEx(`${id}`, 15000, JSON.stringify(result));
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

  disableSong = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    try {
      const result = await songController.disableSong(id, value);
      res.status(200).json({ result: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
module.exports = SongsHandler;
