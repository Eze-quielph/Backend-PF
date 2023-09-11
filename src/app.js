const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./Routes/index.routes");

const app = express();

// Middlewares y Cors
const allowedOrigins = [
  "https://spoot-chat-client-iota.vercel.app",
  "http://localhost:4322",
  "https://spoot-front-andrewsando.vercel.app"

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Rutas
app.use(mainRouter);

module.exports = app;
