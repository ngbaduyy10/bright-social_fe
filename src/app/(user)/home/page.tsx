import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();
  console.log(session);
  
  return <div className="h-[1200px]">Home</div>;
}