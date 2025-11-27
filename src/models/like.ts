import Base from "./base";
import User from "./user";

export default interface Like extends Base {
  user: User;
}