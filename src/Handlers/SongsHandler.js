const { SongsControllers } = require("../Controllers/index.controllers");

const songController = new SongsControllers();

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
    const { name, description, artist, genre, image } = req.body;
    const { id } = req.params

    try {
        const result = await songController.updateSong(id, name, description, artist, genre, image);
        res.status(200).json({result: result})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
  };
}

module.exports = SongsHandler;
