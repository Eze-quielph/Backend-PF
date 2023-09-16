const songRouter = require("express").Router();

//Middleware
const validateInputMiddleware = require("../Middleware/songs.Middleware/getName.middleware");
const validateIdMiddleware = require("../Middleware/songs.Middleware/GetId.middleware");
const validatePutMiddleware = require("../Middleware/songs.Middleware/Put.middleware");
const validatePostMiddlewae = require("../Middleware/songs.Middleware/Post.middleware");

const validateTokenMiddleware = require("../Middleware/jwt.middleware/verifyToken.middleware");

//Handler
const { SongsHandler } = require("../Handlers/index.handlers");
const songsHandler = new SongsHandler();

//Files
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//Routes
songRouter.get("/", songsHandler.getSong); //GET All
songRouter.get("/name", validateInputMiddleware, songsHandler.getByName); // GET by Name
songRouter.get("/:id", validateIdMiddleware, songsHandler.getById); //GET by Id
songRouter.put("/point/:id", validateIdMiddleware, songsHandler.pointSong);
songRouter.put(
  "/:id",
  upload.single("file"),
  validatePutMiddleware,
  songsHandler.updateSong
); // name | description | genre | artist | image

songRouter.post(
  "/post",
  validateTokenMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "sound", maxCount: 1 },
  ]),
  validatePostMiddlewae,
  songsHandler.postSound
); // name | description | genre | artist | image | sound

songRouter.delete("/delete/:id", validateIdMiddleware, songsHandler.deleteSong);
songRouter.get("/restore/:id", validateIdMiddleware, songsHandler.restoreSong);
songRouter.post("/orderName", songsHandler.sortByName);
songRouter.post("/orderDate", songsHandler.sortByDate);

module.exports = songRouter;
