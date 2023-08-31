const usersRouter = require("express").Router();

const UserHandler = require("../Handlers/userHandler");
const userHandler = new UserHandler();

//Files
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

usersRouter.get("/", userHandler.getUsers);
usersRouter.get("/:id", userHandler.getUserById);
usersRouter.delete("/:id", userHandler.deleteUser);
usersRouter.put("/:id", upload.single("file"), userHandler.putUser);
usersRouter.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  userHandler.postUser
);

// usersRouter.post("/", (req, res) => {
//   res.send("estas en el post");
// });

module.exports = usersRouter;
