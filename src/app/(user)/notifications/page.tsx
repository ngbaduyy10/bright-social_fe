import PageTitle from "@/components/atoms/PageTitle";
import { fetchApiWithAuth } from "@/utils/api";
import { notificationLimit } from "@/utils/constant";
import { ApiResponse } from "@/dto/apiResponse.dto";
import Notification from "@/models/notification";
import NotificationSectionClient from "./NotificationSectionClient";

export default async function NotificationPage() {
  const initialNotificationsResponse: ApiResponse<Notification[]> = await fetchApiWithAuth(`/notification?page=1&limit=${notificationLimit}`, { cache: "no-store" });
  const initialNotifications: Notification[] = initialNotificationsResponse.data;
  return (
    <>
      <PageTitle title="Notifications" description="Manage your notifications" />
      <div className="bg-white rounded-lg shadow-sm p-1">
        <NotificationSectionClient initialNotifications={initialNotifications} />
      </div>
    </>
  )
}