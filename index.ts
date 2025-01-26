import { config } from 'dotenv';
config();
import { createServer } from 'node:http';
import app from './app';
import { dbConnect } from './src/common/dbConnect';
import { WebsocketService } from './src/common/WebSocket.service';

const PORT = process.env.PORT || 3000;
const websocketService = new WebsocketService();
const server = createServer(app).listen(PORT, () => {
  dbConnect();
  console.log(`API started and listening on port ${PORT}`);
});

server.on('upgrade', (req, socket, head) => {
  websocketService.handleUpgrade(req, socket, head);
});
