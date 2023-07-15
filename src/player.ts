import { Socket } from "socket.io";

export class Player {
  name: string;
  socket: Socket;
  isHost: boolean = false;

  constructor(name: string, socket: Socket) {
    this.name = name;
    this.socket = socket;
  }

  getName() {
    return this.name;
  }

  getSocket() {
    return this.socket;
  }

  getIsHost() {
    return this.isHost;
  }

  setIsHost(isHost: boolean) {
    this.isHost = isHost;
  }
}
