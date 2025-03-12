"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";

interface Notification {
  id: string;
  message: string;
  link: string;
  read: boolean;
}

const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const userAddress = useActiveAccount();
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/notifications/${userAddress}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [userAddress]);

  return (
    <div className="fixed top-4 right-4 space-y-2">
      {notifications.map((notification) => (
        <div key={notification.id} className="p-4 bg-white rounded shadow">
          <p>{notification.message}</p>
          <Link href={notification.link}>
            <a className="text-blue-500">View Proposal</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Notification;