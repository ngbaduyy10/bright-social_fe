import User from "@/models/user";
import Post from "@/models/post";

export interface SearchPageResponse {
  users: User[];
  posts: Post[];
}