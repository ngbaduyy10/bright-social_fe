import Post from "@/models/post";
import { UserStory } from "./userStory.dto";

export interface HomePageResponse {
  posts: Post[];
  stories: UserStory[];
}