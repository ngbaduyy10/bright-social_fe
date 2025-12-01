import Message from "./message";
import User from "./user";
import Base from "./base";

export default interface Conversation extends Base {
  user1: User;
  user2: User;
  last_message: Message;
  messages: Message[];
}
