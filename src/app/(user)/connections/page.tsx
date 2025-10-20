'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { connectionTabs } from '@/utils/constant';
import { ConnectionType } from '@/types';
import ConnectionList from '@/components/organisms/ConnectionList';

export default function ConnectionPage() {
  const [activeTab, setActiveTab] = useState<string>(connectionTabs[0].id);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="">
      <h1 className="mb-4 text-[34px] font-bold">Connections</h1>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-4 bg-white shadow-sm">
          {connectionTabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id} 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-200 cursor-pointer"
            >
              <tab.icon size={16} />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {connectionTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.id === ConnectionType.SUGGESTED ? (
              <div className="flex-center py-12 text-gray-500">
                Find new connections to add to your network.
              </div>
            ) : (
              <ConnectionList type={tab.id as ConnectionType} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}