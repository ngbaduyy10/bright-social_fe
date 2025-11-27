import Base from "./base";
import User from "./user";

export default interface Comment extends Base {
  content: string;
  user: User;
}