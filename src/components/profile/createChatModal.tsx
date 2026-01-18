"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateChatMutation } from "@/redux/features/chatAPI";
import { MessageSquare } from "lucide-react";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  role?: string;
};

const CreateChatModal = ({ myId }: { myId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [createChat, { isLoading }] = useCreateChatMutation();

  const cookies = parseCookies();
  const token = cookies.token || cookies.user;

  const handleMessageClick = () => {
    if (!token) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    // token থাকলে message page বা action
    router.push("/messages");
  };

  const handleCreateChat = async () => {
    try {
      const res = await createChat({
        participants: [myId],
      }).unwrap();
      // console.log(res);
      if (res.success) {
        router.push("/recruiter/messages"); // 🔹 navigate after success
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2"
          onClick={() => handleMessageClick()}>
          <MessageSquare className="w-4 h-4" />
          Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start Chat</DialogTitle>
        </DialogHeader>

        <Button
          onClick={handleCreateChat}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white"
        >
          {isLoading ? "Creating..." : "Create Chat"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatModal;
