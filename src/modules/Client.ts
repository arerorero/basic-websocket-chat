import { Message } from "./Message";

export class Client {
  constructor() {
    this.nickname = undefined;
    this.history = [];
  }
  nickname: String | undefined;
  color: String | undefined;
  history: Array<Message>;
}
