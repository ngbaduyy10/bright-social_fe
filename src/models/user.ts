import Base from "./base";
import { ConnectionType, Gender } from "@/types";
import Post from "./post";
import Media from "./media";

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
  posts?: Post[];
  media?: Media[];
  mutual?: number;
  total_friends?: number;
  connection_type?: ConnectionType;
}