import Base from "./base";
import User from "./user";

export default interface Story extends Base {
  content?: string;
  url?: string;
  background_color?: string;
  type: StoryType;
  user: User;
}