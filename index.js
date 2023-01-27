const { Globals } = require('./Utils/Globals');
const { Server } = require('./Game/Server');

Server.start(Globals.Port);
Globals.startPlayerLoop();
Globals.startConsole();