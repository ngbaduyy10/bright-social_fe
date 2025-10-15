import Base from "./base";
import { Gender } from "@/types";

export default interface User extends Base {
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  gender?: Gender;
  phone?: string;
  image?: string;
  cover_image?: string;
  bio?: string;
  is_verified?: boolean;
}