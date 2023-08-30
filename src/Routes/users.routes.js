const usersRouter = require("express").Router();

const UserHandler = require("../Handlers/userHandler");
const userHandler = new UserHandler();

usersRouter.get("/", userHandler.getUsers);
usersRouter.get("/:id", userHandler.getUserById);
usersRouter.post("/", userHandler.postUser);
usersRouter.delete("/:id", userHandler.deleteUser);
usersRouter.put("/:id", userHandler.putUser);

// usersRouter.post("/", (req, res) => {
//   res.send("estas en el post");
// });

module.exports = usersRouter;
