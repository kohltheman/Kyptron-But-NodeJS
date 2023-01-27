const { BitWriter } = require('./BitWriter');

class FVector {
    constructor(X, Y, Z) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }
}

class FRotator {
    constructor(Yaw, Pitch, Roll) {
        this.Yaw = Yaw;
        this.Pitch = Pitch;
        this.Roll = Roll;
    }
}

class E_Direction {
    static get Forward() { return 0; }
    static get Backwards() { return 1; }
    static get Left() { return 2; }
    static get Right() { return 3; }
    static get NotMoving() { return 4; }
}

class Globals {
    // [ == UDP Settings == ]
    static Port = 7777;
    static Udp;
    static Players = [];

    // [ == Player Settings == ]
    static EnableMaxPlayers = true;
    static MaxPlayers = 69;
    static BanPlayersAllow = true;
    static DefaultPawn = "BlueprintGeneratedClass /Game/Abilities/Player/Pawns/PlayerPawn_Generic.PlayerPawn_Generic_C";

    // [ == Game Settings == ]
    static MapName = "Zone_Outpost_CannyValley";
    static AllowHusks = false;
    static AllowDamage = false;

    // [ == Global Settings == ]
    static GSVersion = 1.0;
    static GameVersion = "4.";
    static TickSpeed = 120;
    static lastTime = 0;

    static getDeltaTime() {
        let now = Date.now();
        let dT = (now - this.lastTime);
        this.lastTime = now;
        return dT;
    }

    static startConsole() {
        let command = '';
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Enter a Command:', (answer) => {
            command = answer;
            this.commands(command);
        });
    }

    static commands(command) {
        switch (command) {
            case "CrashServer":
                console.log("Crashing Server");
                for (let i = 0; i < Globals.Players.length; i++) {
                    if (Globals.Players[i]) {
                        Functions.forceLeave(Globals.Players[i]);
                    }
                }
                break;
        }
    }
    
    static startPlayerLoop() {
        setInterval(() => {
            Globals.Players.forEach(player => {
                var Writer = new BitWriter();
                Writer.Write("Tick");
                Writer.Write(player.PlayerName);
                Writer.Write(player.Location.X);
                Writer.Write(player.Location.Y);
                Writer.Write(player.Location.Z);
                Writer.Write(player.Rotation.Pitch);
                Writer.Write(player.Rotation.Yaw);
                Writer.Write(player.Rotation.Roll);
                player.Send(Writer.Dump());
            });
        }, 1000);
    }
}

module.exports = {
    Globals,
    E_Direction,
    FRotator,
    FVector
}