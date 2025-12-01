import Base from "./base";
import Media from "./media";
import User from "./user";
import Comment from "./comment";
import Like from "./like";

export default interface Post extends Base {
  content?: string;
  media?: Media[];
  user: User;
  likes?: Like[];
  comments?: Comment[];
  is_saved?: boolean;
  is_liked?: boolean;
}