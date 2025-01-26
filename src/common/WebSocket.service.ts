import WebSocket, { WebSocketServer } from 'ws';

export class WebsocketService {
  private wss: WebSocket.Server;

  // This is for testing purpose only
  // For production use in memory database like Redis
  private clients: Set<WebSocket>;

  constructor() {
    this.wss = new WebSocketServer({ noServer: true });
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
  }

  public handleUpgrade(req: any, socket: any, head: any) {
    this.wss.handleUpgrade(req, socket, head, (ws: WebSocket) => {
      this.wss.emit('connection', ws, req);
    });
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
