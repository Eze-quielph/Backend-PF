const usersRouter = require("express").Router();

const UserHandler = require("../Handlers/userHandler");
const userHandler = new UserHandler();

//Files
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

usersRouter.get("/", userHandler.getUsers);
usersRouter.get("/:id", userHandler.getUserById);
usersRouter.delete("/:id", userHandler.deleteUser);
usersRouter.post("/", upload.single("files"), userHandler.postUser);
usersRouter.put("/:id", upload.single("files"), userHandler.putUser);

// usersRouter.post("/", (req, res) => {
//   res.send("estas en el post");
// });

module.exports = usersRouter;
