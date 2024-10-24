import WebSocket, { Server } from "ws";

const wss = new Server({ port: 1107 });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    console.log(`${message}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

console.log("Servidor WebSocket rodando");
