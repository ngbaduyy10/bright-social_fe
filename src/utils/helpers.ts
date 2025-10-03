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