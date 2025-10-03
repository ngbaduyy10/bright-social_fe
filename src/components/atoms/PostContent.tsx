"use client";

import { useState } from "react";

interface PostContentProps {
  content: string | undefined;
  maxLength?: number;
}

export default function PostContent({ content, maxLength = 150 }: PostContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = content && content.length > maxLength;
  
  return (
    <div>
      <p className="text-foreground text-justify leading-5">
        {shouldTruncate && !isExpanded 
          ? (
              <>
                {content?.substring(0, maxLength)}...
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-black text-sm hover:text-primary font-medium transition-colors cursor-pointer"
                >
                  View more
                </button>
              </>
            )
          : content
        }
      </p>
    </div>
  );
}
