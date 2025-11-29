/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LoadingSpinner from "@/lib/loading-spinner";
import { getImageUrl } from "@/lib/utils";
import { useGetChatsQuery } from "@/redux/features/chatAPI";
import { useGetMeQuery } from "@/redux/features/userApi";
import { CircleUserRound, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Input } from "../ui/input";

export default function ChatList() {
  const pathname = usePathname();
  const { data: userData } = useGetMeQuery("");
  const currentUserId = userData?._id;
  const currentUserRole = userData?.role;

  const { data, isLoading, isError, refetch } = useGetChatsQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [optimisticChats, setOptimisticChats] = useState<any[]>([]);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const chatsData = data?.data || [];

  // Get the correct participant based on current user's role and ID
  const getParticipantInfo = useMemo(() => {
    return (chat: any) => {
      if (!chat.participants || chat.participants.length === 0) {
        return { name: "Unknown", image: null };
      }

      // If current user is a participant, find the other participant
      if (currentUserId) {
        const otherParticipant = chat.participants.find(
          (participant: any) => participant._id !== currentUserId
        );

        if (otherParticipant) {
          return {
            name: otherParticipant.name || "Unknown",
            image: otherParticipant.image,
            role: otherParticipant.role,
          };
        }
      }

      // Fallback: return the first participant
      const firstParticipant = chat.participants[0];
      return {
        name: firstParticipant?.name || "Unknown",
        image: firstParticipant?.image,
        role: firstParticipant?.role,
      };
    };
  }, [currentUserId]);

  // Combine API data with optimistic updates - FIXED VERSION
  const allChats = useMemo(() => {
    if (optimisticChats.length === 0) return chatsData;

    // Create a map to track which chats have been updated
    const chatMap = new Map();

    // First, add all API chats to the map
    chatsData.forEach((chat: any) => {
      chatMap.set(chat._id, chat);
    });

    // Then, update with optimistic data (only lastMessage and updatedAt)
    optimisticChats.forEach((optimisticChat) => {
      const existingChat = chatMap.get(optimisticChat._id);

      if (existingChat) {
        // Update only message-related fields, keep all other data from API
        chatMap.set(optimisticChat._id, {
          ...existingChat,
          lastMessage: optimisticChat.lastMessage,
          updatedAt: optimisticChat.updatedAt,
        });
      }
      // Don't add new chats from optimistic updates - wait for API refetch
    });

    return Array.from(chatMap.values());
  }, [chatsData, optimisticChats]);

  // Filter chats based on search term
  const filteredMessages = useMemo(() => {
    if (!searchTerm.trim()) {
      return allChats;
    }

    const lowercasedSearchTerm = searchTerm.toLowerCase();

    return allChats.filter((chat: any) => {
      const participant = getParticipantInfo(chat);
      const participantName = participant.name || "";
      const lastMessage = chat.lastMessage?.text || "";

      return (
        participantName.toLowerCase().includes(lowercasedSearchTerm) ||
        lastMessage.toLowerCase().includes(lowercasedSearchTerm)
      );
    });
  }, [allChats, searchTerm, getParticipantInfo]);

  // Socket connection for real-time updates
  useEffect(() => {
    // console.log("🔌 Connecting socket for chat list...");
    // console.log("Current User ID:", currentUserId);
    // console.log("Current User Role:", currentUserRole);

    const socket = io("https://api.goroqit.com");
    socketRef.current = socket;

    socket.on("connect", () => {
      // console.log("✅ Chat list socket connected");
      setIsSocketConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Chat list socket disconnected");
      setIsSocketConnected(false);
    });

    // Listen for new messages to update chat list
    const handleNewMessage = (newMessage: any) => {
      console.log("📨 New message received in chat list:", newMessage);

      // Only process messages that belong to the current user's chats
      if (!currentUserId) return;

      // Check if this chat already exists in chatsData
      const existingChat = chatsData.find(
        (chat: any) => chat._id === newMessage.chatId
      );

      if (existingChat) {
        // Only update optimistic state if chat exists in API data
        setOptimisticChats((prev) => {
          const updatedChats = prev.filter(
            (chat) => chat._id !== newMessage.chatId
          );

          updatedChats.push({
            _id: newMessage.chatId,
            lastMessage: {
              text: newMessage.text,
              createdAt: newMessage.createdAt,
            },
            updatedAt: newMessage.createdAt,
          });

          return updatedChats;
        });
      }

      // Refetch chats to get updated data with proper participant info
      setTimeout(() => {
        refetch();
      }, 100);
    };

    // Listen for multiple possible event names
    socket.on("newMessage", handleNewMessage);
    socket.on("message", handleNewMessage);
    socket.on("getMessage", handleNewMessage);

    // Listen for specific chat events
    socket.onAny((eventName, data) => {
      if (eventName.includes("Message") || eventName.includes("message")) {
        console.log(`📡 Chat list received event: ${eventName}`, data);
        // Only handle if this message is relevant to current user
        handleNewMessage(data);
      }
    });

    return () => {
      console.log("🧹 Cleaning up chat list socket");
      socket.off("newMessage", handleNewMessage);
      socket.off("message", handleNewMessage);
      socket.off("getMessage", handleNewMessage);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [refetch, currentUserId, currentUserRole, chatsData]);

  // Function to update chat list when sending a message
  const updateChatOnMessageSend = (chatId: string, messageText: string) => {
    const newMessage = {
      _id: `temp-${Date.now()}`,
      text: messageText,
      createdAt: new Date().toISOString(),
      chatId,
    };

    // Check if chat exists before optimistic update
    const existingChat = chatsData.find((chat: any) => chat._id === chatId);

    if (existingChat) {
      setOptimisticChats((prev) => {
        const updatedChats = prev.filter((chat) => chat._id !== chatId);

        updatedChats.push({
          _id: chatId,
          lastMessage: {
            text: messageText,
            createdAt: newMessage.createdAt,
          },
          updatedAt: newMessage.createdAt,
        });

        return updatedChats;
      });
    }

    // Always refetch to get latest data
    setTimeout(() => {
      refetch();
    }, 100);
  };

  // Sort chats by last message time (newest first)
  const sortedChats = useMemo(() => {
    return [...filteredMessages].sort((a, b) => {
      const timeA = new Date(
        a.lastMessage?.createdAt || a.updatedAt || 0
      ).getTime();
      const timeB = new Date(
        b.lastMessage?.createdAt || b.updatedAt || 0
      ).getTime();
      return timeB - timeA;
    });
  }, [filteredMessages]);

  // Debug: Log participant information
  useEffect(() => {
    if (sortedChats.length > 0) {
      console.log("🧩 Chat list participants debug:");
      sortedChats.forEach((chat, index) => {
        const participant = getParticipantInfo(chat);
        console.log(`Chat ${index + 1}:`, {
          chatId: chat._id,
          participantName: participant.name,
          allParticipants: chat.participants,
          currentUserId,
          currentUserRole,
        });
      });
    }
  }, [sortedChats, currentUserId, currentUserRole, getParticipantInfo]);

  // base path condition
  let basePath = "/recruiter/messages";
  if (pathname.startsWith("/profile/messages")) {
    basePath = "/profile/messages";
  } else if (pathname.startsWith("/admin/messages")) {
    basePath = "/admin/messages";
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Failed to load chats</div>;
  }

  return (
    <aside className="">
      <div className="w-full bg-white border-r border-gray-200 flex flex-col">
        {/* 🔍 Search bar with connection status */}
        <div className="p-3 py-3.5 border-b border-gray-200">
          <h3 className="text-2xl font-semibold mb-2">All Messages</h3>
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search messages"
              className="pl-10 bg-gray-50 border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">
              {sortedChats.length} {sortedChats.length === 1 ? "chat" : "chats"}
            </span>
            <div className="flex items-center space-x-1">
              <div
                className={`w-2 h-2 rounded-full ${
                  isSocketConnected ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-gray-500">
                {isSocketConnected ? "Live" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {sortedChats.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {searchTerm
                ? "No chats found matching your search"
                : "No chats available"}
            </div>
          ) : (
            sortedChats.map((chat: any) => {
              const participant = getParticipantInfo(chat);
              const lastMessageTime =
                chat.lastMessage?.createdAt || chat.updatedAt;

              // Check if this is an optimistic update
              const isOptimistic = optimisticChats.some(
                (optChat) =>
                  optChat._id === chat._id &&
                  optChat.lastMessage?.text === chat.lastMessage?.text
              );

              return (
                <div
                  key={chat._id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    isOptimistic ? "bg-gray-200" : ""
                  }`}
                >
                  <Link href={`${basePath}/${chat._id}`}>
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        {participant?.image ? (
                          <Image
                            src={getImageUrl(participant?.image)}
                            alt={participant?.name || "Chat"}
                            width={1000}
                            height={1000}
                            className="rounded-full w-10 h-10"
                          />
                        ) : (
                          <CircleUserRound className="size-11" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">
                            {participant.name || "Unknown User"}
                            {participant.role && (
                              <span className="ml-2 text-xs text-gray-500 capitalize">
                                ({participant.role})
                              </span>
                            )}
                            {isOptimistic && (
                              <span className="ml-1 text-xs text-blue-500">
                                •
                              </span>
                            )}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {lastMessageTime
                              ? new Date(lastMessageTime).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )
                              : ""}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {chat.lastMessage?.text || "No messages yet"}
                          {isOptimistic && (
                            <span className="inline-block w-2 h-2 ml-1 bg-blue-500 rounded-full animate-pulse" />
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}
