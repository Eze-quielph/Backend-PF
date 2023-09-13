const express = require("express");
const http = require("http")
const {Server} = require("socket.io")
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./Routes/index.routes");

const app = express();
const server = http.createServer(app)
const io = new Server(server)

io.on("connection", socket =>{
  console.info(socket)
})

// Middlewares y Cors
const allowedOrigins = [
  "https://spoot-chat-client-iota.vercel.app",
  "http://localhost:4322",
  "https://spoot-front-andrewsando.vercel.app"
]

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

module.exports = server;
