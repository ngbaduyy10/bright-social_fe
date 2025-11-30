'use client';

import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';
import Notification from '@/models/notification';

export const useNotificationSocket = (token: string) => {
  const { socket, isConnected, error } = useSocket({
    namespace: '/notification',
    token,
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('new_notification', (notification) => {
      console.log('🔔 New notification:', notification);
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off('new_notification');
    };
  }, [socket]);

  const markNotificationSeen = (notificationId: string) => {
    if (socket && isConnected) {
      socket.emit('mark_notification_seen', { notificationId });
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_seen: true, seen_at: new Date() }
            : notification
        )
      );
    }
  };

  const markAllSeen = () => {
    if (socket && isConnected) {
      socket.emit('mark_all_notifications_seen');
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          is_seen: true,
          seen_at: new Date(),
        }))
      );
    }
  };

  return {
    socket,
    isConnected,
    error,
    notifications,
    markNotificationSeen,
    markAllSeen,
  };
};