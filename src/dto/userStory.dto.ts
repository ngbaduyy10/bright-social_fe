import User from "@/models/user";
import Story from "@/models/story";

export interface UserStory {
  user: User;
  stories: Story[];
}