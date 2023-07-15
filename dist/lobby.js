"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lobby = void 0;
const gamestate_1 = require("./gamestate");
class Lobby {
    constructor(id) {
        this.id = id;
        this.players = [];
        this.gameState = gamestate_1.GameState.LOBBY;
        console.log("created lobby with id " + id);
    }
    addPlayer(player) {
        console.log("adding player " + player.name + " to lobby " + this.id);
        player.socket.join(this.id);
        this.players.push(player);
        player.socket.emit("joinedGame", this.id, player.name, this.players.map((p) => p.name), player.isHost);
        player.socket.to(this.id).emit("playerJoined", this.players.map((p) => p.name));
    }
    removePlayer(player) {
        console.log("removing player " + player.name + " from lobby " + this.id);
        player.socket.leave(this.id);
        this.players.splice(this.players.indexOf(player), 1);
    }
    getPlayer(playerName) {
        for (let player of this.players) {
            if (player.name == playerName) {
                return player;
            }
        }
        return null;
    }
    getPlayers() {
        return this.players;
    }
    getGameState() {
        return this.gameState;
    }
    setGameState(gameState) {
        this.gameState = gameState;
    }
    getID() {
        return this.id;
    }
    getNumberOfPlayers() {
        return this.players.length;
    }
}
exports.Lobby = Lobby;
//# sourceMappingURL=lobby.js.map