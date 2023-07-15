import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
import { Lobby } from "./lobby";
import { Player } from "./player";
import { Socket } from "socket.io";

const app = express();

let lobbies: Map<string, Lobby> = new Map();

app.use(
  "/socket.io",
  express.static(path.join(__dirname, "node_modules/socket.io/client-dist/"))
);
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./client/index.html"));
});

io.on("connection", function (socket: Socket) {
  console.log("a user connected");

  socket.on("createGame", (playerName: string, gameName: string) => {
    const player = new Player(playerName, socket);

    if (gameName.length > 0) {
      if (lobbies.has(gameName)) {
        const lobby = lobbies.get(gameName);

        lobby.addPlayer(player);
      } else {
        console.log("game with code " + gameName + " does not exist");
      }
    } else {
      let code = Math.floor(Math.random() * 1000000).toString();

      while (lobbies.has(code)) {
        code = Math.floor(Math.random() * 1000000).toString();
      }

      const lobby = new Lobby(code);

      lobbies.set(code, lobby);
      lobby.addPlayer(player);

      console.log("created game with code " + code);
    }
  });
});

const server = http.listen(3000, function () {
  console.log("listening on *:3000");
});
