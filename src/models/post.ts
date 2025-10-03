import Base from "./base";
import Image from "./image";
import User from "./user";

export default interface Post extends Base {
  content?: string;
  images?: Image[];
  user: User;
}