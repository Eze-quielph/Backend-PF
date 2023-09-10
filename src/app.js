const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./Routes/index.routes");

const app = express();

// Middlewares y Cors
app.use(cors({
    origin: "http://localhost:5173", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }));
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Rutas
app.use(mainRouter);

module.exports = app;