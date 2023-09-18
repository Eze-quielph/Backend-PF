const usersRouter = require("express").Router();

//Handlers
const UserHandler = require("../Handlers/userHandler");
const userHandler = new UserHandler();
const LoginHandler = require("../Handlers/loginHandler");
const loginHandler = new LoginHandler();

//Middlewares
const validateIdMiddleware = require("../Middleware/users.Middleware/getById.middleware");
const validateNameMiddleware = require("../Middleware/users.Middleware/name.middleware");
const validateUpdateMiddleware = require("../Middleware/users.Middleware/update.middleware");
const validatePostMiddleware = require("../Middleware/users.Middleware/create.middleware");
const validateTokenMiddleware = require("../Middleware/jwt.middleware/verifyToken.middleware");

//Files
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//Routes
usersRouter.put("/password", userHandler.returnPassword)
usersRouter.get("/",  validateTokenMiddleware, userHandler.getUsers);
usersRouter.get("/name", validateTokenMiddleware, validateNameMiddleware, userHandler.getUsersName);
usersRouter.get("/:id",validateTokenMiddleware, validateIdMiddleware, userHandler.getUserById);
usersRouter.delete("/:id", validateTokenMiddleware,validateIdMiddleware, userHandler.deleteUser);
usersRouter.post("/login", loginHandler.postLogin)
usersRouter.post(
  "/register",
  upload.single("file"),
  validatePostMiddleware,
  userHandler.registertUser
);
usersRouter.put(
  "/:id",
  validateTokenMiddleware,
  upload.single("file"),
  validateIdMiddleware,
  validateUpdateMiddleware,
  userHandler.putUser
);
usersRouter.get('/restore/:id', validateIdMiddleware, userHandler.restoreUserById);

module.exports = usersRouter;
