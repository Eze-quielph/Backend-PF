const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./Routes/index.routes");
const LiveChat = require("./Services/socketio/Socket.io");

const app = express();
const server = http.createServer(app);
const liveChat = new LiveChat(server);

// Middlewares y Cors
const allowedOrigins = [
  "https://spoot-chat-client-iota.vercel.app",
  "http://localhost:5173",
  "https://spoot-front-andrewsando.vercel.app",
];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors());
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Rutas
app.use(mainRouter);

module.exports = { app, server };
