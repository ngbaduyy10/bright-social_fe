"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import SearchInput from "../molecules/SearchInput";
import { History, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getAllUsers } from "@/lib/actions/user.action";
import User from "@/models/user";
import UserAvatar from "../atoms/UserAvatar";
import { useRouter } from "next/navigation";

export default function SearchInputDropdown() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [clearKeyword, setClearKeyword] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const router = useRouter();

  const handleClick = (url: string) => {
    router.push(url);
    setOpen(false);
    setTimeout(() => {
      setClearKeyword(true);
    }, 100);
  }

  const onChange = useCallback((keyword: string) => {
    keyword = keyword.trim();
    
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!keyword) {
      setUsers(null);
      return;
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        abortControllerRef.current = new AbortController();
        setKeyword(keyword);
        const response = await getAllUsers({ keyword, page: 1, limit: 7 });
        if (response.success && !abortControllerRef.current.signal.aborted) {
          setUsers(response.data);
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        console.error(error);
      }
    }, 200);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const onSubmit = (keyword: string) => {
    if (!keyword) return;
    handleClick(`/search?keyword=${keyword}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="w-full md:w-[350px]">
          <SearchInput 
            className="w-full" 
            onSubmit={onSubmit} 
            onChange={onChange} 
            clearKeyword={clearKeyword}
            setClearKeyword={setClearKeyword}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={8}
        className="w-[calc(100vw-2rem)] md:w-[350px] p-0 border-gray-200"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {users ? (
          users.length > 0 ? (
            <>
              {users.map((user) => (
                <div 
                  key={user.id} 
                  onClick={() => handleClick(`/profile/${user.username}`)}
                  className="p-3 rounded hover:bg-accent cursor-pointer flex items-center gap-[10px]"
                >
                  <UserAvatar 
                    image={user.image}
                    className="w-[32px] h-[32px]"
                  />
                  {user.first_name} {user.last_name}
                </div>
              ))}
            </>
          ) : (
            <div 
              onClick={() => handleClick(`/search?keyword=${keyword}`)}
              className="p-3 rounded hover:bg-accent cursor-pointer flex items-center gap-[10px]"
            >
              <div className="w-[32px] h-[32px] flex-center bg-secondary rounded-full">
                <Search size={18} className="text-primary" />
              </div>
              {keyword}
            </div>
          )
        ) : (
          <>
            <div className="px-3 py-2 text-muted-foreground border-b border-gray-200">Recent Searches</div>
            <div className="py-1">
              <div 
                onClick={() => handleClick(`/search?keyword=Duy Nguyen`)}
                className="p-3 rounded hover:bg-accent cursor-pointer flex items-center gap-2"
              >
                <div className="w-[32px] h-[32px] flex-center bg-secondary rounded-full">
                  <History size={18} className="text-primary" />
                </div>
                Duy Nguyen
              </div>
              <div 
                onClick={() => handleClick(`/search?keyword=Bright`)}
                className="p-3 rounded hover:bg-accent cursor-pointer flex items-center gap-2"
              >
                <div className="w-[32px] h-[32px] flex-center bg-secondary rounded-full">
                  <History size={18} className="text-primary" />
                </div>
                Bright
              </div>
              <div 
                onClick={() => handleClick(`/search?keyword=John Doe`)}
                className="p-3 rounded hover:bg-accent cursor-pointer flex items-center gap-2"
              >
                <div className="w-[32px] h-[32px] flex-center bg-secondary rounded-full">
                  <History size={18} className="text-primary" />
                </div>
                John Doe
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}