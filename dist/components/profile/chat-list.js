"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatList;
const jsx_runtime_1 = require("react/jsx-runtime");
const input_1 = require("@/components/ui/input");
const utils_1 = require("@/lib/utils");
const chatAPI_1 = require("@/redux/features/chatAPI");
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_1 = require("react");
function ChatList() {
    const pathname = (0, navigation_1.usePathname)();
    const { data, isLoading, isError } = (0, chatAPI_1.useGetChatsQuery)(undefined);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    console.log(data, "chat");
    // Filter chats based on search term
    const filteredMessages = (0, react_1.useMemo)(() => {
        const messages = (data === null || data === void 0 ? void 0 : data.data) || [];
        if (!searchTerm.trim()) {
            return messages;
        }
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return messages.filter((chat) => {
            var _a;
            const participant = ((_a = chat.participants) === null || _a === void 0 ? void 0 : _a[0]) || {};
            const participantName = participant.name || "";
            return participantName.toLowerCase().includes(lowercasedSearchTerm);
        });
    }, [data === null || data === void 0 ? void 0 : data.data, searchTerm]);
    // base path condition
    let basePath = "/recruiter/messages";
    if (pathname.startsWith("/profile/messages")) {
        basePath = "/profile/messages";
    }
    else if (pathname.startsWith("/admin/messages")) {
        basePath = "/admin/messages";
    }
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)("div", { className: "p-4", children: "Loading chats..." });
    }
    if (isError) {
        return (0, jsx_runtime_1.jsx)("div", { className: "p-4 text-red-500", children: "Failed to load chats" });
    }
    return ((0, jsx_runtime_1.jsx)("aside", { className: "", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full bg-white border-r border-gray-200 flex flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-3 py-3.5 border-b border-gray-200", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "Search messages", className: "pl-10 bg-gray-50 border-gray-200", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 overflow-y-auto", children: filteredMessages.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "p-4 text-center text-gray-500", children: searchTerm
                            ? "No chats found matching your search"
                            : "No chats available" })) : (filteredMessages.map((chat) => {
                        var _a, _b, _c;
                        const participant = ((_a = chat.participants) === null || _a === void 0 ? void 0 : _a[0]) || {};
                        return ((0, jsx_runtime_1.jsx)("div", { className: "p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: `${basePath}/${chat._id}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start space-x-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: (0, utils_1.getImageUrl)(participant.image), alt: participant.name || "Chat", width: 40, height: 40, className: "rounded-full" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-medium text-gray-900 truncate", children: participant.name || "Unknown" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-gray-500", children: ((_b = chat.lastMessage) === null || _b === void 0 ? void 0 : _b.createdAt)
                                                                ? new Date(chat.lastMessage.createdAt).toLocaleTimeString()
                                                                : "" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 truncate mt-1", children: ((_c = chat.lastMessage) === null || _c === void 0 ? void 0 : _c.text) || "No messages yet" })] })] }) }) }, chat._id));
                    })) })] }) }));
}
