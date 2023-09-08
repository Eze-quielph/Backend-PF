const UploadFile = require("../Services/Upload");
const uploadFIle = new UploadFile();
const { FavoriteSongController } = require("../Controllers/index.controllers");
const favoriteSongController = new FavoriteSongController();
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_BAD_REQUEST,
} = require("../Utils/statusCode");

class FavoriteSongHandler {
  constructor() {}
  postFavorite = async (req, res) => {
    //res.send("estas en post de handlers");
    // const result = await favoriteSongController.postSong();
    // res.send(result);

    const { id } = req.params;
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
      const result = await favoriteSongController.postSong(
        name,
        description,
        artist,
        genre,
        image,
        song,
        id
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
}
module.exports = FavoriteSongHandler;
