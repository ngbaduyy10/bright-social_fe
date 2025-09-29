import CommonButton from "@/components/atoms/CommonButton";
import UserAvatar from "@/components/atoms/UserAvatar"

// Fake data
interface Sponsor {
  name: string;
  avatar?: string;
  content: string;
}
const sponsors: Sponsor[] = [
  {
    name: "Gisney",
    content: "Make 2 posts at our new theme park.",
  },
  {
    name: "Foo bar",
    content: "baz quux.",
  },
  {
    name: "Lorem ipsum",
    content: "dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
interface TrendingTopic {
  topic: string;
  posts: number;
}
const topics: TrendingTopic[] = [
  { topic: "#Lorem ipsum dolor sit amet, consectetur adipiscing elit", posts: 1245 },
  { topic: "#Foo bar", posts: 980 },
  { topic: "#Battery stable", posts: 420 },
  { topic: "#Unpopular topic", posts: 1 },
];
interface OnlineUser {
  name: string;
  avatar?: string;
  status: "green" | "yellow" | "red";
}
const onlineUsers: OnlineUser[] = [
  { name: "Jane Doe", status: "green" },
  { name: "Jame Smith", status: "yellow" },
  { name: "Lorem ipsum dolor sit amet", status: "red" },
];

export default function RightSidebar() {
  return (
    <div className="h-full flex flex-col gap-3 bg-background py-4 md:py-6 px-2 overflow-y-auto scrollbar-hide">
      <div className="px-4 py-6 bg-white rounded-lg min-h-[300px]">
        {/* Sponsors */}
        <h2 className="font-semibold text-lg mb-2">Sponsors</h2>
        {sponsors.slice(0, 3).map((item, index) => (
          <div key={index} className="flex flex-1 items-center justify-between min-h-[72px]">
            {/* avatar + text */}
            <div className="flex gap-3">
              {/* avatar */}
              <div className="flex-shrink-0 py-1">
                <UserAvatar
                  username={item.name}
                  image={item.avatar}
                />
              </div>
              {/* text */}
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.name}</span>
                <span className="text-sm text-muted-foreground line-clamp-2">{item.content}</span>
              </div>
            </div>
            {/* button */}
            <div>
              <CommonButton>
                <span>View</span>
              </CommonButton>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-6 bg-white rounded-lg min-h-[200px]">
        {/* Trending */}
        <h2 className="font-semibold text-lg mb-2">Trending</h2>
        {topics.slice(0, 3).map((item, index) => (
          <div key={index} className="flex flex-col py-1">
            <span className="font-medium text-foreground truncate">{item.topic}</span>
            <span className="text-sm text-muted-foreground">{item.posts} posts</span>
          </div>
        ))}
      </div>
      <div className="px-4 py-6 bg-white rounded-lg min-h-[300px]">
        {/* Online Users */}
        <h2 className="font-semibold text-lg">Online Users</h2>
        {onlineUsers.slice(0, 3).map((item, index) => {
          let avatarStatus = `absolute bottom-1 right-0 w-3 h-3 border-2 border-white rounded-full bg-${item.status}-500`;
          return (
            <div key={index} className="flex items-center justify-between min-h-[52px]">
              {/* avatar + text */}
              <div className="flex flex-1 gap-3">
                {/* avatar */}
                <div className="relative flex-shrink-0 py-1">
                  <UserAvatar
                    username={item.name}
                    image={item.avatar}
                  />
                  <span className={avatarStatus}></span>
                </div>
                {/* text */}
                <div className="flex-1">
                  <span className="font-medium line-clamp-1">{item.name}</span>
                </div>
                {/* button */}
              </div>
              <CommonButton>
                <span>Chat</span>
              </CommonButton>
            </div>
          )
        }
        )}
      </div>
    </div>
  )
}