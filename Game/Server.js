const dgram = require('dgram');
const { Globals } = require('../Utils/Globals');

class Client {
    constructor(endPoint) {
        this.endPoint = endPoint;
    }

    send(bytes) {
        Globals.udp.send(bytes, bytes.length, this.endPoint);
    }

    async sendAsync(bytes) {
        return new Promise((resolve, reject) => {
            Globals.udp.send(bytes, bytes.length, this.endPoint, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}

class Server {
    static start(port) {
        console.log(`
 ██ ▄█▀▓██   ██▓ ██▓███  ▄▄▄█████▓ ██▀███   ▒█████   ███▄    █ 
 ██▄█▒  ▒██  ██▒▓██░  ██▒▓  ██▒ ▓▒▓██ ▒ ██▒▒██▒  ██▒ ██ ▀█   █ 
▓███▄░   ▒██ ██░▓██░ ██▓▒▒ ▓██░ ▒░▓██ ░▄█ ▒▒██░  ██▒▓██  ▀█ ██▒
▓██ █▄   ░ ▐██▓░▒██▄█▓▒ ▒░ ▓██▓ ░ ▒██▀▀█▄  ▒██   ██░▓██▒  ▐▌██▒
▒██▒ █▄  ░ ██▒▓░▒██▒ ░  ░  ▒██▒ ░ ░██▓ ▒██▒░ ████▓▒░▒██░   ▓██░
▒ ▒▒ ▓▒   ██▒▒▒ ▒▓▒░ ░  ░  ▒ ░░   ░ ▒▓ ░▒▓░░ ▒░▒░▒░ ░ ▒░   ▒ ▒ 
░ ░▒ ▒░ ▓██ ░▒░ ░▒ ░         ░      ░▒ ░ ▒░  ░ ▒ ▒░ ░ ░░   ░ ▒░
░ ░░ ░  ▒ ▒ ░░  ░░         ░        ░░   ░ ░ ░ ░ ▒     ░   ░ ░ 
░  ░    ░ ░ ░ ░         ░ ░           ░ 
        ░ ░                                                   
`);
        console.log('[ == CREDITS == ]');
        console.log('Array0x - Base Project, Connection, Switching Levels');
        console.log('GD - Replication\n');
        console.log('[KYPTRON LOG]: Starting Kyptron Server');
        Globals.udp = dgram.createSocket('udp4');
        Globals.udp.bind(port);
        console.log('KYPTRON LOG: Started Kyptron Server');
        if (Globals.EnableMaxPlayers === true) {
            console.log("[KYPTRON LOG]: Client Slots: " + Globals.MaxPlayers);
        } else {
            console.log("[KYPTRON LOG]: Client Queue: ∞");
        }
        Globals.udp.on('message', async function (data, sender) {
            for (const player of Globals.Players) {
                if (player.endpoint.port === sender.port) {
                    await player.process(data);
                    return;
                }
            }
            let newPlayer = new Player(sender);
            await newPlayer.process(data);
        });
    }
}

module.exports = {
    Client,
    Server
}