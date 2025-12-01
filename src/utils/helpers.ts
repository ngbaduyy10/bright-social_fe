import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function getTimeAgo(created_at: Date): string {
  const createdDate = dayjs(created_at);
  
  if (!createdDate.isValid()) {
    return 'Invalid date';
  }
  
  return createdDate.fromNow();
}

export function formatMessageTimestamp(created_at: Date): string {
  if (!created_at) return "";
    
  const messageDate = dayjs(created_at);
  const now = dayjs();
  const today = now.startOf("day");
  const yesterday = now.subtract(1, "day").startOf("day");
  const messageDay = messageDate.startOf("day");
  const daysDiff = today.diff(messageDay, "day");
  
  if (messageDate.isSame(today, "day")) {
    return messageDate.format("HH:mm");
  }

  if (messageDate.isSame(yesterday, "day")) {
    return "Yesterday";
  }
  
  if (daysDiff >= 2 && daysDiff <= 7) {
    return messageDate.format("ddd");
  }
  
  return messageDate.format("D MMM");
}

export function formatDateSeparator(created_at: Date | string): string {
  if (!created_at) return "";
  
  const messageDate = dayjs(created_at instanceof Date ? created_at : new Date(created_at));
  const now = dayjs();
  const today = now.startOf("day");
  const yesterday = now.subtract(1, "day").startOf("day");
  const messageDay = messageDate.startOf("day");
  const daysDiff = today.diff(messageDay, "day");
  
  if (messageDate.isSame(today, "day")) {
    return "Today";
  }

  if (messageDate.isSame(yesterday, "day")) {
    return "Yesterday";
  }
  
  if (daysDiff >= 2 && daysDiff <= 7) {
    return messageDate.format("ddd");
  }
  
  return messageDate.format("D MMM");
}

export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = dayjs(date1 instanceof Date ? date1 : new Date(date1));
  const d2 = dayjs(date2 instanceof Date ? date2 : new Date(date2));
  return d1.isSame(d2, "day");
}