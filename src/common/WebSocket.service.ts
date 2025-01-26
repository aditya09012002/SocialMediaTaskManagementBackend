import WebSocket, { WebSocketServer } from 'ws';

export class WebsocketService {
  private wss: WebSocket.Server;

  // This is for testing purpose only
  // For production use in memory database like Redis
  private clients: Set<WebSocket>;

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });
    this.clients = new Set();

    this.wss.on('connection', (ws) => {
      this.clients.add(ws);

      ws.on('close', () => {
        this.clients.delete(ws);
      });

      ws.on('error', (error) => {
        console.log('Websocket Error:', error);
      });
    });
    console.log(`WebSocket server running on ws://localhost:${port}`);
  }

  broadcast(data: object) {
    const message = JSON.stringify(data);
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }
}
