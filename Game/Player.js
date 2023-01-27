const { Client } = require('./Server');

class Player extends Client {
    constructor(endpoint) {
        super(endpoint);
        Globals.players.push(this);
        this.playerName = "";
        this.isCrouched = false;
        this.location = {};
        this.rotation = {};
    }

    async process(data) {
        if (data) {
            const reader = new BitReader(data);
            let functionName = reader.readString();
            if (functionName === "Join") {
                this.playerName = reader.readString();
                console.log(`${this.playerName} Joined!`);
                await Functions.switchLevel(this, Globals.mapName);
            } else if (functionName === "ReadyToStartMatch") {
                for (let player of Globals.players) {
                    if (player !== this) {
                        await Functions.initPlayer(this, player.playerName);
                        await Functions.initPlayer(player, this.playerName);
                    }
                }
            } else if (functionName === "PlayerTick") {
                const playerName = reader.readString();
                const x = reader.readFloat();
                const y = reader.readFloat();
                const z = reader.readFloat();
                const pitch = reader.readFloat();
                const yaw = reader.readFloat();
                const roll = reader.readFloat();
                let gameSender = null;
                for (let player of Globals.players) {
                    if (player.playerName === playerName) {
                        player.location = { x, y, z };
                        player.rotation = { pitch, yaw, roll };
                        gameSender = player;
                        break;
                    }
                }
                for (let player of Globals.players) {
                    if (player.playerName !== playerName) {
                        await Game.Functions.playerTick(player, gameSender);
                    }
                }
            } else if (functionName === "ForceLeave") {
                await Functions.forceLeave(this);
            }
        }
    }
}

module.exports = {
    Player
}