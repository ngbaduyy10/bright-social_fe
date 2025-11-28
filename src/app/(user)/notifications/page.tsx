import NotificationCard from "@/components/molecules/NotificationCard";
import { notifications } from "@/utils/constant";
import PageTitle from "@/components/atoms/PageTitle";

export default function NotificationPage() {
  return (
    <>
      <PageTitle title="Notifications" description="Manage your notifications" />
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