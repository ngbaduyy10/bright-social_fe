"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PostList from "@/components/organisms/PostList";
import { profileTabs } from "@/utils/constant";
import MediaList from "@/components/organisms/MediaList";
import User from "@/models/user";

interface ProfileTabsProps {
  user: User;
}

export default function ProfileTabs({ user }: ProfileTabsProps) {
  const posts = user.posts || [];
  const media = user.media || [];

  return (
    <Tabs defaultValue={profileTabs[0].id} className="w-full items-center pt-3">
      <TabsList className="grid grid-cols-2 bg-white h-full p-1 shadow-sm">
        {profileTabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-200 cursor-pointer"
          >
            <span className="text-md font-medium px-6">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value={profileTabs[0].id} className="mt-2">
        {posts.length > 0 ? (
          <PostList initialPosts={posts} endpoint={`/${posts[0].user.id}`} />
        ) : (
          <div className="bg-white rounded-lg p-4 shadow-sm flex-center h-[300px] text-gray-500">
            No posts to display
          </div>
        )}
      </TabsContent>
      
      <TabsContent value={profileTabs[1].id} className="mt-2 w-full">
        {media.length > 0 ? (
          <MediaList initialMedia={media} userId={user.id} />
        ) : (
          <div className="bg-white rounded-lg p-4 shadow-sm flex-center h-[300px] text-gray-500">
            No media to display
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
