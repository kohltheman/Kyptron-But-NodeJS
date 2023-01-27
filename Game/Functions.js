class Functions {
    constructor() {
        this.random = Math.random();
    }

    static randomString(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return new Array(length).fill(chars).map(s => s[Math.floor(Math.random() * s.length)]).join('');
    }

    static async switchLevel(targetPlayer, map) {
        let writer = {};
        writer.write = function(key, value) { this[key] = value; }
        writer.write("SwitchLevel", map);
        writer.write("PlayerName", targetPlayer.PlayerName);
        console.log("[KYPTRON LOG]: A new client has connected");
        console.log(map);
        await targetPlayer.sendAsync(writer);
    }

    static async initPlayer(targetPlayer, newPlayerName) {
        let writer = {};
        writer.write = function(key, value) { this[key] = value; }
        writer.write("InitPlayer", newPlayerName);
        await targetPlayer.sendAsync(writer);
    }

    static async playerTick(targetPlayer, sender) {
        let writer = {};
        writer.write = function(key, value) { this[key] = value; }
        writer.write("Tick", sender.PlayerName);
        //Location (FVector)
        writer.write("LocationX", sender.Location.X);
        writer.write("LocationY", sender.Location.Y);
        writer.write("LocationZ", sender.Location.Z);
        //Rotation (FRotator)
        writer.write("RotationYaw", sender.Rotation.Yaw);
        writer.write("RotationPitch", sender.Rotation.Pitch);
        writer.write("RotationRoll", sender.Rotation.Roll);
        await targetPlayer.sendAsync(writer);
    }

    static async forceLeave(targetPlayer) {
        let writer = {};
        writer.write = function(key, value) { this[key] = value; }
        writer.write("ForceLeave", null);
        await targetPlayer.sendAsync(writer);
    }
}

module.exports = {
    Functions
}