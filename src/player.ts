import { Socket } from "socket.io";

export class Player {
  name: string;
  socket: Socket;

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
}
