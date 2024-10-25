export class Message {
  constructor(nickname: String | undefined, text: String) {
    this.nickname = nickname;
    this.data = new Date();
    this.text = text;
  }
  nickname: String | undefined;
  data: Date;
  text: String;
}
