import ChatList from "@/components/profile/chat-list";
import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed  w-[80%]">
      <div className="grid grid-cols-8 ">
        <div className="col-span-2 ">
          <ChatList />
        </div>

        <div className="col-span-6 h-screen">{children}</div>
      </div>
    </div>
  );
}
