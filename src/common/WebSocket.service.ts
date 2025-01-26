import WebSocket from 'ws';

export class WebsocketService {
  public static clients: Set<WebSocket> = new Set();

  public broadcast(data: object) {
    const message = JSON.stringify(data);
    for (const client of WebsocketService.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }
}
