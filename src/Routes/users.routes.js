const usersRouter = require("express").Router();

//Handlers
const UserHandler = require("../Handlers/userHandler");
const userHandler = new UserHandler();

//Middlewares
const validateIdMiddleware = require("../Middleware/users.Middleware/getById.middleware");
const validateNameMiddleware = require("../Middleware/users.Middleware/name.middleware");
const validateUpdateMiddleware = require("../Middleware/users.Middleware/update.middleware");
const validatePostMiddleware = require("../Middleware/users.Middleware/create.middleware");

//Files
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//Routes
usersRouter.get("/", userHandler.getUsers);
usersRouter.get("/name", validateNameMiddleware, userHandler.getUsersName);
usersRouter.get("/:id", validateIdMiddleware, userHandler.getUserById);
usersRouter.delete("/:id", validateIdMiddleware, userHandler.deleteUser);
usersRouter.post(
  "/",
  upload.single("file"),
  validatePostMiddleware,
  userHandler.postUser
);
usersRouter.put(
  "/:id",
  upload.single("file"),
  validateIdMiddleware,
  validateUpdateMiddleware,
  userHandler.putUser
);
usersRouter.get('/restore/:id', validateIdMiddleware, userHandler.restoreUserById);


module.exports = usersRouter;