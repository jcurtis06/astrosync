import { GameState } from "./gamestate";
import { Player } from "./player";

export class Lobby {
  id: string;
  players: Player[];
  gameState: GameState;

  constructor(id: string) {
    this.id = id;
    this.players = [];
    this.gameState = GameState.LOBBY;

    console.log("created lobby with id " + id);
  }

  addPlayer(player: Player) {
    console.log("adding player " + player.name + " to lobby " + this.id);

    player.socket.join(this.id);
    player.socket.emit("joinedGame", this.id, player.name);
    this.players.push(player);
  }

  removePlayer(player: Player) {
    console.log("removing player " + player.name + " from lobby " + this.id);

    player.socket.leave(this.id);
    this.players.splice(this.players.indexOf(player), 1);
  }

  getPlayer(playerName: string): Player {
    for (let player of this.players) {
      if (player.name == playerName) {
        return player;
      }
    }
    return null;
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getGameState(): GameState {
    return this.gameState;
  }

  setGameState(gameState: GameState) {
    this.gameState = gameState;
  }

  getID(): string {
    return this.id;
  }

  getNumberOfPlayers(): number {
    return this.players.length;
  }
}
