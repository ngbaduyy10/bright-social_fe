import Base from "./base";
import { NotificationType } from "@/types";
import User from "./user";
import Post from "./post";

export default interface Notification extends Base {
  user: User;
  actor: User;
  post?: Post;
  type: NotificationType;
  is_seen: boolean;
  seen_at?: Date;
  content?: string;
}

