"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const lobby_1 = require("./lobby");
const player_1 = require("./player");
const app = express();
let lobbies = new Map();
app.use("/socket.io", express.static(path.join(__dirname, "node_modules/socket.io/client-dist/")));
app.use(express.static(path.join(__dirname, "../client/")));
app.set("port", process.env.PORT || 3000);
let http = require("http").Server(app);
let io = require("socket.io")(http);
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./client/index.html"));
});
io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on("createGame", (playerName, gameName) => {
        const player = new player_1.Player(playerName, socket);
        if (gameName.length > 0) {
            if (lobbies.has(gameName)) {
                const lobby = lobbies.get(gameName);
                lobby.addPlayer(player);
            }
            else {
                console.log("game with code " + gameName + " does not exist");
            }
        }
        else {
            let code = Math.floor(Math.random() * 1000000).toString();
            while (lobbies.has(code)) {
                code = Math.floor(Math.random() * 1000000).toString();
            }
            const lobby = new lobby_1.Lobby(code);
            lobbies.set(code, lobby);
            player.setIsHost(true);
            lobby.addPlayer(player);
            console.log("created game with code " + code);
        }
    });
});
const server = http.listen(3000, function () {
    console.log("listening on *:3000");
});
//# sourceMappingURL=server.js.map