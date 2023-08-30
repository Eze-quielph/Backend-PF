const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');
const mainRouter = require("./routes/index.routes");

const app = express();

//Midleware and Cors
app.disable("x-powered-by");
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

//routes
app.use(mainRouter);

module.exports = app;
