import Base from "./base";
import Media from "./media";
import User from "./user";

export default interface Post extends Base {
  content?: string;
  media?: Media[];
  user: User;
}