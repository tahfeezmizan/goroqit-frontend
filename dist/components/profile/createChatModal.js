"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const button_1 = require("@/components/ui/button");
const dialog_1 = require("@/components/ui/dialog");
const chatAPI_1 = require("@/redux/features/chatAPI");
const lucide_react_1 = require("lucide-react");
const CreateChatModal = ({ myId }) => {
    // const params = useParams(); // 🔹 dynamic route params
    const router = (0, navigation_1.useRouter)();
    const [createChat, { isLoading }] = (0, chatAPI_1.useCreateChatMutation)();
    const handleCreateChat = async () => {
        try {
            const res = await createChat({
                participants: [myId],
            }).unwrap();
            console.log(res);
            if (res.success) {
                router.push("/recruiter/messages"); // 🔹 navigate after success
            }
        }
        catch (error) {
            console.error("Error creating chat:", error);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, { className: "w-4 h-4" }), "Message"] }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "sm:max-w-md", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "Start Chat" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleCreateChat, disabled: isLoading, className: "w-full bg-blue-600 text-white", children: isLoading ? "Creating..." : "Create Chat" })] })] }));
};
exports.default = CreateChatModal;
