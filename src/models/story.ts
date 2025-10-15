import Base from "./base";
import User from "./user";
import { StoryType } from "@/types";

export default interface Story extends Base {
  content?: string;
  url?: string;
  background_color?: string;
  type: StoryType;
  user: User;
}