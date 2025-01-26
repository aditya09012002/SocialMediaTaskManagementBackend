import WebSocket, { WebSocketServer } from 'ws';

export class WebsocketService {
  private static instance: WebsocketService;
  private wss: WebSocket.Server;
  private clients: Set<WebSocket>;

  private constructor() {
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

  // Singleton getter to ensure only one instance
  public static getInstance(): WebsocketService {
    if (!this.instance) {
      this.instance = new WebsocketService();
    }
    return this.instance;
  }

  public handleUpgrade(req: any, socket: any, head: any) {
    this.wss.handleUpgrade(req, socket, head, (ws: WebSocket) => {
      this.wss.emit('connection', ws, req);
    });
  }

  public broadcast(data: object) {
    const message = JSON.stringify(data);
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }
}
