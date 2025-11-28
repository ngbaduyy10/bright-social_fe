'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { connectionTabs } from '@/utils/constant';
import { ConnectionType } from '@/types';
import ConnectionList from '@/components/organisms/ConnectionList';
import PageTitle from '@/components/atoms/PageTitle';

export default function ConnectionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const validTypes = Object.values(ConnectionType);
  const defaultType = ConnectionType.FRIEND;
  
  const currentType = useMemo(() => {
    const typeFromQuery = searchParams.get('type') as ConnectionType | null;
    return typeFromQuery && validTypes.includes(typeFromQuery) 
      ? typeFromQuery 
      : defaultType;
  }, [searchParams]);

  const [activeTab, setActiveTab] = useState<string>(currentType);

  useEffect(() => {
    setActiveTab(currentType);
  }, [currentType]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', value);
    router.push(`/connections?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="">
      <PageTitle title="Connections" description="View your connections" />

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
            <ConnectionList type={tab.id as ConnectionType} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}