import NotificationCard from "@/components/molecules/NotificationCard";
import { notifications } from "@/utils/constant";

export default function NotificationPage() {
  return (
    <>
      <h1 className="mb-4 text-[34px] font-bold">Notifications</h1>
      <div className="bg-white rounded-lg shadow-sm px-1">
        <div className="py-1">
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} isPage={true} />
          ))}
        </div>
      </div>
    </>
  )
}