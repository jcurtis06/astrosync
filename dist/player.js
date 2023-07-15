"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(name, socket) {
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
exports.Player = Player;
//# sourceMappingURL=player.js.map