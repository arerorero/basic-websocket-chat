import WebSocket from "ws";
import readline from "readline";
import { Client } from "./modules/Client";
import { Message } from "./modules/Message";
import { colors } from "./utils/colors";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ws = new WebSocket("ws://localhost:1107");

const client = new Client();

ws.on("open", () => {
  console.log(`${colors.green}Conectado ao servidor de chat!${colors.reset}`);
  rl.question(
    `${colors.green}Por favor, digite seu nickname: ${colors.reset}`,
    (nickname: string) => {
      client.nickname = nickname;
      client.color = getUserColor(nickname);
      ws.send(`${client.nickname} entrou no chat!!`);
      rl.prompt();
      rl.on("line", (text: string) => {
        if (text.trim()) {
          pushMessage(text);
        }
      });
    }
  );
});

ws.on("message", (message: WebSocket.Data) => {
  console.log(message.toString());
});

ws.on("close", () => {
  console.log(`${colors.red}Desconectado do servidor${colors.reset}`);
  process.exit(0);
});

function pushMessage(text: string) {
  const message = new Message(client.nickname, text);
  client.history.push(message);
  clearPreviousLine();
  ws.send(
    `[${message.data.toLocaleString().split(", ")[1]}] - ${client.color}${client.nickname}: ${message.text}${colors.reset}`
  );
}

function getUserColor(nickname: string): string {
  const colorList = [
    colors.cyan,
    colors.green,
    colors.yellow,
    colors.magenta,
    colors.blue,
  ];
  const index = nickname
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colorList[index % colorList.length];
}

function clearPreviousLine() {
  process.stdout.moveCursor(0, -1);
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
}
