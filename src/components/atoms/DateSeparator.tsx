"use client";

import { formatDateSeparator } from "@/utils/helpers";

interface DateSeparatorProps {
  date: Date | string;
}

export default function DateSeparator({ date }: DateSeparatorProps) {
  const dateLabel = formatDateSeparator(date);

  return (
    <div className="flex items-center gap-3 my-4 w-1/2 mx-auto">
      <div className="flex-1 h-px bg-gray-300"></div>
      <span className="text-gray-500 font-medium">{dateLabel}</span>
      <div className="flex-1 h-px bg-gray-300"></div>
    </div>
  );
}

