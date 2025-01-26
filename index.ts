import { config } from 'dotenv';
config();
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import app from './app';

import { dbConnect } from './src/common/dbConnect';
import { WebsocketService } from './src/common/WebSocket.service';

const PORT = process.env.PORT || 3000;
export const server = createServer(app).listen(PORT, () => {
  dbConnect();
  console.log(`API started and listening on port ${PORT}`);
});

export const wss = new WebSocketServer({ server });


wss.on('connection', (ws) => {
  WebsocketService.clients.add(ws);

  ws.on('close', () => {
    WebsocketService.clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.log('WebSocket Error:', error);
  });
});
