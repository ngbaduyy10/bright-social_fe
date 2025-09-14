import { auth } from "@/auth";

export default async function NewsFeedPage() {
  const session = await auth();
  console.log(session);
  
  return <div>NewsFeed</div>;
}