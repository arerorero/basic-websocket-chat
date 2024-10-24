import WebSocket from "ws";
import readline from "readline";
import { Client } from "./modules/Client";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ws = new WebSocket("ws://localhost:1107");

const client = new Client();

ws.on("open", () => {
  console.log("Conectado ao servidor de chat!");
  rl.question("Por favor, digite seu nickname: ", (nickname: string) => {
    client.nickname = nickname;
    ws.send(`${client.nickname} entrou no chat!!`);
    rl.on("line", (message: string) => {
      const data = new Date().toLocaleString().split(", ")[1];
      ws.send(`[${data}] - ${client.nickname}: ${message}`);
    });
  });
});

ws.on("message", (message: WebSocket.Data) => {
  console.log(message.toString());
});

ws.on("close", () => {
  console.log("Desconectado do servidor");
  process.exit(0);
});
