const { SongsControllers } = require("../Controllers/index.controllers");
const UploadFile = require("../Services/Upload");

const songController = new SongsControllers();
const uploadFIle = new UploadFile();

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_BAD_REQUEST,
} = require("../Utils/statusCode");

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
          res.status(HTTP_STATUS_OK).json({ result: result });
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
      res.status(HTTP_STATUS_OK).json({ result: result });
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
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
          res.status(HTTP_STATUS_OK).json({ result });
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

      res.status(HTTP_STATUS_OK).json({ result });
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
    }
  };

  getById = async (req, res) => {
    const { id } = req.params;

    try {
      let result;

      await client.get(`${id}`, (err, reply) => {
        if (reply) {
          result = JSON.parse(reply);
          res.status(HTTP_STATUS_OK).json({ result: result });
        }
        console.log(err);
      });

      result = await songController.getById(id);

      await client.setEx(`${id}`, 15000, JSON.stringify(result));
      res.status(HTTP_STATUS_OK).json({ result: result });
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
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

        if (data.length < 15) {
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
      res.status(HTTP_STATUS_OK).json({ result: result });
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
    }
  };

  postSound = async (req, res) => {
    const { name, description, artist, genre } = req.body;

    try {
      const uploadedImage = await uploadFIle.uploadImage(
        req.files.image[0].path
      );
      const uploadedSound = await uploadFIle.uploadSound(
        req.files.sound[0].path
      );

      const image = uploadedImage;
      const song = uploadedSound;

      const result = await songController.postSong(
        name,
        description,
        artist,
        genre,
        image,
        song
      );

      if (result.error) {
        res.status(HTTP_STATUS_BAD_REQUEST).json({ error: result.error });
      } else {
        res.status(HTTP_STATUS_OK).json({ result: result });
      }
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
    }
  };

  async deleteSong(req, res) {
    const { id } = req.params;

    try {
      const result = await songController.deleteSong(id);
      res.status(HTTP_STATUS_OK).json({ result });
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
    }
  }

  restoreSong = async (req, res) => {
    const { id } = req.params;

    try {
      const result = await songController.restoreSong(id);
      res.status(HTTP_STATUS_OK).json({ result });
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
    }
  };

  sortByName = async (req, res) => {
    // res.send("estas en el orderByName");
    try {
      const byName = await songController.oderByName();
      res.status(HTTP_STATUS_OK).json({ result: byName });
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
    }
  };

  sortByDate = async (req, res) => {
    // res.send("estas en el orderByData");
    try {
      const byDate = await songController.oderByDate();
      res.status(HTTP_STATUS_OK).json({ result: byDate });
    } catch (error) {
      res.status(HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
    }
  };
}
module.exports = SongsHandler;
