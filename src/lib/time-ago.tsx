"use client";

import { useEffect, useState } from "react";

const formatTimeAgo = (date: string | Date) => {
  const past = typeof date === "string" ? new Date(date) : date;
  const diffMs = Math.max(Date.now() - past.getTime(), 0);

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 365)
    return `${Math.floor(days / 365)} year${
      Math.floor(days / 365) > 1 ? "s" : ""
    } ago`;
  if (days >= 30)
    return `${Math.floor(days / 30)} month${
      Math.floor(days / 30) > 1 ? "s" : ""
    } ago`;
  if (days > 0) return days === 1 ? "1 day ago" : `${days} days ago`;
  if (hours > 0) return hours === 1 ? "1h ago" : `${hours}h ago`;
  if (minutes > 0) return minutes === 1 ? "1m ago" : `${minutes}m ago`;
  return seconds === 1 ? "1s ago" : `${seconds}s ago`;
};

export default function TimeAgo({ date }: { date: string | Date }) {
  const [label, setLabel] = useState(formatTimeAgo(date));

  useEffect(() => {
    const interval = setInterval(() => setLabel(formatTimeAgo(date)), 60000);
    return () => clearInterval(interval);
  }, [date]);

  return <span>{label}</span>;
}
