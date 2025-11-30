import Base from "./base";
import Conversation from "./conversation";
import User from "./user";

export default interface Message extends Base {
  conversation: Conversation;
  sender: User;
  content: string;
  is_seen: boolean;
  seen_at?: Date;
}

