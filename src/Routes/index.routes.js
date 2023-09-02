const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");
const songRouter = require("./Song.routes");
const playlistsRouter = require("./playlists.routes");
const loginRouter = require("./login.routes");
//***************jwt******************** */
// const validateTokenMiddleware = require("../Middleware/jwt.middleware/verifyToken.middleware");
// const jwt = require("jsonwebtoken");

//*************************************** */
mainRouter.use("/users", usersRouter);
mainRouter.use("/song", songRouter);
mainRouter.use("/playlists", playlistsRouter);
mainRouter.use("/api", loginRouter);
//*************************************** */

module.exports = mainRouter;

//************** JWT ********************** */
// mainRouter.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;
//   //console.log(username, password);
//   //res.send("estas en la raiz");

//   try {
//     const user = await User.findOne({
//       where: {
//         username: username,
//         password: password,
//       },
//     });
//     if (user) {
//       // El usuario existe en la base de datos
//       //res.status(200).json({ message: "Usuario válido" });
//       jwt.sign({ user }, "secretKey", { expiresIn: "15s" }, (err, token) => {
//         res.json(token);
//       });
//     } else {
//       // El usuario no existe en la base de datos
//       res.status(401).json({ message: "Usuario no válido" });
//     }
//   } catch (error) {
//     res.status(403).json({ error: error.message });
//   }
// });

//Authorization: Bearer <token>
// function verifyToken(req, res, next) {
//   const beareHader = req.headers["authorization"];

//   if (typeof beareHader !== "undefined") {
//     const bearerToken = beareHader.split(" ")[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }

// mainRouter.post("/api/post", validateTokenMiddleware, (req, res) => {
//   //res.send("estas en la raiz de post");
//   jwt.verify(req.token, "secretKey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         mensaje: "postCreated",
//         authData,
//       });
//     }
//   });
// });
