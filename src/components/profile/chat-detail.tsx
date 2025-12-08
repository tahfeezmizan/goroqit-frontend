"use client";

import placeholderImg from "@/assets/telent-person.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getImageUrl } from "@/lib/utils";
import {
  useGetChatsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/features/chatAPI";
import { useGetMeQuery } from "@/redux/features/userApi";
import { AlertCircle, CircleUserRound, Send } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { PageLoading } from "../shared/page-loading";

interface Message {
  _id: string;
  sender: string;
  text: string;
  createdAt: string;
  chatId: string;
}

export default function ChatDetail() {
  const params = useParams();
  const { id } = params;
  const chatId = id as string;

  const { data: userData } = useGetMeQuery("");
  const myId = userData?._id;

  // State management
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [containerHeight, setContainerHeight] = useState<string>("100vh");

  // RTK Query hooks
  const { data, isLoading, isError } = useGetMessagesQuery(
    { chatId, page: 1, limit: 50 },
    { skip: !chatId }
  );
  const { data: chatData } = useGetChatsQuery(undefined);
  const [sendMessageAPI] = useSendMessageMutation();

  const activeUser = chatData?.data.find(
    (chat: { _id: string }) => chat._id === chatId
  );

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  // Dynamic height management
  useEffect(() => {
    const updateContainerHeight = () => {
      const viewportHeight = window.innerHeight;
      const headerHeight = 80;
      const inputHeight = 80;
      const availableHeight = viewportHeight - headerHeight - inputHeight;
      setContainerHeight(`${Math.max(availableHeight, 300)}px`);
    };

    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);
    return () => window.removeEventListener("resize", updateContainerHeight);
  }, []);

  // Socket connection management - FIXED
  useEffect(() => {
    if (!chatId || !myId) return;

    // console.log("🔌 Connecting to socket for chat:", chatId);

    const newSocket = io("https://api.goroqit.com");
    socketRef.current = newSocket;

    newSocket.on("connect", () => {
      // console.log("✅ Socket connected");
      setIsSocketConnected(true);
    });

    newSocket.on("disconnect", () => {
      // console.log("❌ Socket disconnected");
      setIsSocketConnected(false);
    });

    // Listen for the EXACT event name that backend emits
    const receiveMessageHandler = (newMessage: Message) => {
      // console.log("📨 REAL-TIME MESSAGE RECEIVED:", newMessage);

      setAllMessages((prev) => {
        // Prevent duplicates
        if (prev.some((msg) => msg._id === newMessage._id)) {
          // console.log("🔄 Message already exists, skipping");
          return prev;
        }

        // console.log("✅ Adding new message to UI");
        const updatedMessages = [...prev, newMessage];

        // Scroll to bottom
        setTimeout(() => {
          scrollToBottom();
        }, 100);

        return updatedMessages;
      });
    };

    // Listen to the EXACT event name: getMessage::chatId
    const exactEventName = `getMessage::${chatId}`;
    // console.log("👂 Listening for event:", exactEventName);
    newSocket.on(exactEventName, receiveMessageHandler);

    // Debug: log all socket events
    newSocket.onAny((eventName, ...args) => {
      // console.log("📡 ALL Socket event:", eventName, args);

      // If we see the exact event but handler didn't trigger, manually call it
      if (eventName === exactEventName && args[0]) {
        // console.log("🔄 Manually triggering handler for:", eventName);
        receiveMessageHandler(args[0]);
      }
    });

    // Cleanup
    return () => {
      // console.log("🧹 Cleaning up socket");
      newSocket.off(exactEventName, receiveMessageHandler);
      newSocket.off("connect");
      newSocket.off("disconnect");
      newSocket.disconnect();
      socketRef.current = null;
    };
  }, [chatId, myId]);

  // Load initial messages
  useEffect(() => {
    if (data?.data?.messages) {
      // console.log("📦 Loading initial messages:", data.data.messages.length);
      setAllMessages(data.data.messages);
      setTimeout(() => scrollToBottom(), 500);
    }
  }, [data]);

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  // Send message function
  const handleSendMessage = async () => {
    if (!messageText.trim() || !myId) return;

    try {
      const messageTextToSend = messageText.trim();
      setMessageText("");

      // Send to API - this will trigger backend to save to DB and emit socket event
      const response = await sendMessageAPI({
        chatId,
        text: messageTextToSend,
        type: "TEXT",
      }).unwrap();
    } catch (error) {
      console.error("❌ Failed to send message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Reset when chat changes
  useEffect(() => {
    setAllMessages([]);
  }, [chatId]);

  // Debug: Log when allMessages changes
  useEffect(() => {
    // console.log("🔄 allMessages updated, count:", allMessages.length);
  }, [allMessages]);

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-500 mb-4">Failed to load chat</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-[calc(100vh-128px)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center">
          {activeUser?.participants[0]?.image ? (
            <Image
              src={
                activeUser?.participants[0]?.image
                  ? getImageUrl(activeUser?.participants[0]?.image)
                  : placeholderImg
              }
              alt={activeUser?.participants[0]?.name || "User"}
              width={40}
              height={40}
              className="rounded-full w-10 mr-3"
            />
          ) : (
            <CircleUserRound className="size-11 mr-3" />
          )}
          <h2 className="font-semibold">
            {activeUser?.participants[0]?.name || "Chat"}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isSocketConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-xs text-gray-500">
            {isSocketConnected ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 pb-16"
        style={{
          maxHeight: containerHeight,
          height: containerHeight,
        }}
      >
        {allMessages?.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          allMessages?.map((message, index) => {
            const isMyMessage = message.sender.toString() === myId?.toString();

            return (
              <div
                key={message._id || index}
                className={`flex mb-4 ${
                  isMyMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div>
                  <p
                    className={`text-base leading-relaxed rounded-full py-0.5 px-1.5 ${
                      isMyMessage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </p>
                  <p
                    className={`text-xs mt-1 text-gray-500 ${
                      isMyMessage ? "text-right" : "text-left"
                    }`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white fixed bottom-1 w-[60%] border-t border-gray-200 p-4 flex space-x-2 flex-shrink-0">
        <Input
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
