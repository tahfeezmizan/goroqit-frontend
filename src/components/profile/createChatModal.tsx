"use client";

import { useRouter } from "next/navigation";

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

const CreateChatModal = ({ myId }: { myId: string }) => {
  // const params = useParams(); // 🔹 dynamic route params

  const router = useRouter();
  const [createChat, { isLoading }] = useCreateChatMutation();

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
        <Button variant="outline" size="sm" className="flex items-center gap-2">
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
