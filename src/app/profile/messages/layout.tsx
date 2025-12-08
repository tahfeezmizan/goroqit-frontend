import ChatList from "@/components/profile/chat-list";
import React from "react";



export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed w-full md:w-950% pr-4 lg:pr-0">
      <div className="grid grid-cols-1 md:grid-cols-8  ">
        <div className="col-span-2 ">
          <ChatList  />
        </div>

        <div className="col-span-6 h-screen">{children}</div>
      </div>
    </div>
  );
}
