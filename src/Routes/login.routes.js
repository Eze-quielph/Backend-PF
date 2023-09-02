const loginRouter = require("express").Router();

//handlers login
const LoginHandler = require("../Handlers/loginHandlers");
const loginHandler = new LoginHandler();

loginRouter.post("/login", loginHandler.postLogin);
// loginRouter.post("/login", (req, res) => {
//   res.send("estas en el router");
// });

module.exports = loginRouter;
