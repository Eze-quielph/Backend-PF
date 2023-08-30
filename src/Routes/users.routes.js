const usersRouter = require("express").Router();

// usersRouter.get("/", userHandler.getUsers);
// usersRouter.get("/:id", userHandler.getUserById);
// usersRouter.post("/", userHandler.postUser);
// usersRouter.delete("/:id", userHandler.deleteUser);
// usersRouter.put("/:id", userHandler.putUser);

usersRouter.get("/", (req, res) => {
  res.send("estas en el userRuter");
});

module.exports = usersRouter;
