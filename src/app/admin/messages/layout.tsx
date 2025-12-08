import ChatList from "@/components/profile/chat-list";
import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 overflow-hidden">
      <div className="grid grid-cols-6 min-h-screen">
        <div className="col-span-2 h-screen ">
          <ChatList />
        </div>

        <div className="col-span-4 h-screen">{children}</div>
      </div>
    </div>
  );
}
