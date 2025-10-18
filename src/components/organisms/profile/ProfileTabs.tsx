"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Post from "@/models/post";
import PostList from "@/components/organisms/PostList";
import { profileTabs } from "@/utils/constant";

interface ProfileTabsProps {
  posts: Post[];
}

export default function ProfileTabs({ posts }: ProfileTabsProps) {
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
        <PostList initialPosts={posts} endpoint={`/${posts[0].user.id}`} />
      </TabsContent>
      
      <TabsContent value={profileTabs[1].id} className="mt-2">
        <div className="flex-center h-[300px] text-gray-500">
          Media content will be displayed here
        </div>
      </TabsContent>
    </Tabs>
  );
}
