import User from "./user";
import Base from "./base";
import { FriendStatus } from "@/types";

export default interface Friend extends Base {
  user: User;
  friend: User;
  status: FriendStatus;
}