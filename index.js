import env from "dotenv";
import Express from "express";
import bodyParser from "body-parser";
import http from "http";
import helmet from "helmet";
import cors from "cors";
import Socket from "socket.io";
import { LoadHttp } from "./controller/http";
const morgan = require("morgan");

// load .env data inside the app
env.config();

// declare express server object
const app = Express();

// create http server for socket.io
const server = http.createServer(app);
const io = Socket(server);

// support parsing of application/json type post data
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// use a set of middlewares to secure http server
app.use(helmet());

// use cors to control resource sharing
app.use(cors());

// use morgan as logger for http requests
app.use(morgan("tiny"));

// load each http route from routes directory, inside the backend
LoadHttp(app);

// temp
io.on("connection", socket => {
  socket.emit("test", "hIELOU");
});

// listen http and socket.io server on .env  specified port
server.listen(process.env.PORT, () => {
  console.log(
    `Falticeni Order server is up and running on port ${process.env.PORT}!`
  );
});
