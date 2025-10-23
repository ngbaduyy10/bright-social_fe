"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { searchTabs } from "@/utils/constant";
import PostList from "./PostList";
import { SearchPageResponse } from "@/dto/searchPageResponse.dto";
import UserList from "./UserList";
import { useSearchParams } from "next/navigation";

interface SearchTabsProps {
  initialData: SearchPageResponse;
}

export default function SearchTabs({ initialData }: SearchTabsProps) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const { users, posts } = initialData;

  return (
    <Tabs defaultValue={searchTabs[0].id} className="w-full items-center">
      <TabsList className="grid grid-cols-2 bg-white w-full h-full p-1 shadow-sm">
        {searchTabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-2 px-6">
              <tab.icon size={18} />
              <span className="text-[17px] font-medium">{tab.label}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={searchTabs[0].id} className="mt-2 w-full">
        {users.length > 0 ? (
          <UserList initialUsers={users} params={{ keyword: keyword ?? '' }} />
        ) : (
          <div className="bg-white rounded-lg p-4 shadow-sm flex-center h-[300px] text-gray-500">
            No users to display
          </div>
        )}
      </TabsContent>
      
      <TabsContent value={searchTabs[1].id} className="mt-2 w-full">
        {posts.length > 0 ? (
          <PostList initialPosts={posts} params={{ keyword: keyword ?? '' }} />
        ) : (
          <div className="bg-white rounded-lg p-4 shadow-sm flex-center h-[300px] text-gray-500">
            No posts to display
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}