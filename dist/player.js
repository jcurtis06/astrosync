"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(name, socket) {
        this.isHost = false;
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
    setIsHost(isHost) {
        this.isHost = isHost;
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map