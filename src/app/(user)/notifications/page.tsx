import NotificationCard from "@/components/molecules/NotificationCard";
import { notifications } from "@/utils/constant";

export default function NotificationPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm px-1">
      <div className="p-4 pb-3 border-b border-gray-200">
        <p className="font-semibold text-xl">Notifications</p>
      </div>
      <div className="py-1">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} isPage={true} />
        ))}
      </div>
    </div>
  )
}