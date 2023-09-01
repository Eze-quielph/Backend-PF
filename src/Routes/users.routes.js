const usersRouter = require("express").Router();

const UserHandler = require("../Handlers/userHandler");
const userHandler = new UserHandler();

//Middlewares
const validateIdMiddleware = require("../Middleware/users.playlist/getById.middleware");
const validateNameMiddleware = require("../Middleware/users.playlist/getById.middleware");

//Files
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

usersRouter.get("/", userHandler.getUsers);
usersRouter.get("/name", validateNameMiddleware, userHandler.getUsers);
usersRouter.get("/:id", validateIdMiddleware, userHandler.getUserById);
usersRouter.delete("/:id", validateIdMiddleware, userHandler.deleteUser);
usersRouter.put(
  "/:id",
  upload.single("file"),
  validateIdMiddleware,
  userHandler.putUser
);
usersRouter.post(
  "/",
  upload.single([{ name: "image", maxCount: 1 }]),
  validateIdMiddleware,
  userHandler.postUser
);

module.exports = usersRouter;