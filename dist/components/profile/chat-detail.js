"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatDetail;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const image_1 = __importDefault(require("next/image"));
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const telent_person_png_1 = __importDefault(require("@/assets/telent-person.png"));
const chatAPI_1 = require("@/redux/features/chatAPI");
const page_loading_1 = require("../shared/page-loading");
const infinite_scroll_loader_1 = require("../shared/infinite-scroll-loader");
const use_infinite_scroll_1 = require("../shared/use-infinite-scroll");
const utils_1 = require("@/lib/utils");
const userApi_1 = require("@/redux/features/userApi");
function ChatDetail() {
    var _a;
    const params = (0, navigation_1.useParams)();
    const { id } = params;
    const chatId = id;
    const { data: userData } = (0, userApi_1.useGetMeQuery)('');
    const myId = userData === null || userData === void 0 ? void 0 : userData._id;
    console.log(myId, id, chatId);
    // State management
    const [allMessages, setAllMessages] = (0, react_1.useState)([]);
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [hasMore, setHasMore] = (0, react_1.useState)(true);
    const [isLoadingMore, setIsLoadingMore] = (0, react_1.useState)(false);
    const [loadingError, setLoadingError] = (0, react_1.useState)(null);
    const [isInitialLoad, setIsInitialLoad] = (0, react_1.useState)(true);
    const [containerHeight, setContainerHeight] = (0, react_1.useState)("100vh");
    const [messageText, setMessageText] = (0, react_1.useState)("");
    const [isSocketConnected, setIsSocketConnected] = (0, react_1.useState)(false);
    // RTK Query for messages with dynamic page
    const { data, isLoading, isError, error } = (0, chatAPI_1.useGetMessagesQuery)({ chatId, page: currentPage, limit: 10 }, { skip: !chatId });
    // Refs
    console.log(allMessages, "message");
    const messagesEndRef = (0, react_1.useRef)(null);
    const isScrollingToBottom = (0, react_1.useRef)(false);
    const requestIdRef = (0, react_1.useRef)(0);
    const lastRequestTimeRef = (0, react_1.useRef)(0);
    // Debounced load more function for infinite scroll
    const handleLoadMore = (0, react_1.useCallback)(() => {
        if (!isLoadingMore && hasMore && !isInitialLoad) {
            const now = Date.now();
            const timeSinceLastRequest = now - lastRequestTimeRef.current;
            // Debounce: prevent requests within 500ms of each other
            if (timeSinceLastRequest < 500) {
                return;
            }
            console.log("Loading more messages - Page:", currentPage + 1);
            // Update request tracking
            requestIdRef.current += 1;
            lastRequestTimeRef.current = now;
            setIsLoadingMore(true);
            setLoadingError(null);
            setCurrentPage((prev) => prev + 1);
        }
    }, [isLoadingMore, hasMore, isInitialLoad, currentPage]);
    // Optimized infinite scroll hook
    const { sentinelRef: triggerRef, containerRef, scrollToBottom, maintainScrollPosition, } = (0, use_infinite_scroll_1.useInfiniteScroll)({
        hasMore,
        isLoading: isLoadingMore,
        onLoadMore: handleLoadMore,
        threshold: 0.1,
        rootMargin: "50px",
        debounceMs: 200,
    });
    // Socket connection
    const socket = (0, react_1.useMemo)(() => (0, socket_io_client_1.default)("http://10.10.7.62:5001"), []);
    const [sendMessageAPI] = (0, chatAPI_1.useSendMessageMutation)();
    // Dynamic height management for responsive design
    (0, react_1.useEffect)(() => {
        const updateContainerHeight = () => {
            const viewportHeight = window.innerHeight;
            const headerHeight = 80; // Approximate header height
            const inputHeight = 80; // Approximate input area height
            const availableHeight = viewportHeight - headerHeight - inputHeight;
            setContainerHeight(`${Math.max(availableHeight, 300)}px`);
        };
        updateContainerHeight();
        window.addEventListener("resize", updateContainerHeight);
        return () => window.removeEventListener("resize", updateContainerHeight);
    }, []);
    // Optimized retry handler for failed loads with request tracking
    const handleRetryLoadMore = (0, react_1.useCallback)(() => {
        if (!isLoadingMore && hasMore) {
            // Reset request tracking for retry
            requestIdRef.current += 1;
            lastRequestTimeRef.current = Date.now();
            setLoadingError(null);
            setIsLoadingMore(true);
            setCurrentPage((prev) => prev + 1);
        }
    }, [isLoadingMore, hasMore]);
    // Update messages when data changes
    (0, react_1.useEffect)(() => {
        var _a;
        if (data === null || data === void 0 ? void 0 : data.data) {
            console.log("Data received - Page:", currentPage, "Messages:", (_a = data.data.messages) === null || _a === void 0 ? void 0 : _a.length);
            if (currentPage === 1) {
                // Initial load
                setAllMessages(data.data.messages || []);
                setIsInitialLoad(false);
                isScrollingToBottom.current = true;
            }
            else {
                // Infinite scroll load - maintain scroll position
                setAllMessages((prev) => {
                    const newMessages = data.data.messages || [];
                    const existingIds = new Set(prev.map((msg) => msg._id));
                    const uniqueNewMessages = newMessages.filter((msg) => !existingIds.has(msg._id));
                    return [...uniqueNewMessages, ...prev];
                });
                // Maintain scroll position after loading new messages
                setTimeout(() => {
                    maintainScrollPosition();
                }, 50);
            }
            // Update pagination state
            const pagination = data.data.pagination;
            if (pagination) {
                setHasMore(pagination.totalPage > currentPage);
            }
            else {
                setHasMore(false);
            }
            setIsLoadingMore(false);
            setLoadingError(null);
        }
    }, [data, currentPage, maintainScrollPosition]);
    // Enhanced API error handling with request tracking
    (0, react_1.useEffect)(() => {
        if (isError && error) {
            console.error("Messages API error:", error);
            // Only handle error if it's for the current request
            const currentRequestId = requestIdRef.current;
            setTimeout(() => {
                // Check if this is still the current request
                if (requestIdRef.current === currentRequestId) {
                    setIsLoadingMore(false);
                    setLoadingError("Failed to load messages. Please try again.");
                }
            }, 100); // Small delay to prevent race conditions
        }
    }, [isError, error]);
    // Enhanced scroll to bottom for initial load and new messages
    (0, react_1.useEffect)(() => {
        if (isScrollingToBottom.current && allMessages.length > 0) {
            // Use the optimized scroll function
            scrollToBottom();
            isScrollingToBottom.current = false;
        }
    }, [allMessages, scrollToBottom]);
    // Optimized initial scroll positioning
    (0, react_1.useEffect)(() => {
        if (!isInitialLoad && currentPage === 1 && allMessages.length > 0) {
            const container = containerRef.current;
            if (container && messagesEndRef.current) {
                // Single, smooth scroll to bottom after initial messages are loaded
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        container.scrollTo({
                            top: container.scrollHeight,
                            behavior: "auto",
                        });
                    });
                });
            }
        }
    }, [isInitialLoad, allMessages.length, currentPage, containerRef]);
    // Socket events
    (0, react_1.useEffect)(() => {
        if (!chatId || !socket)
            return;
        socket.on("connect", () => setIsSocketConnected(true));
        socket.on("disconnect", () => setIsSocketConnected(false));
        const receiveMessageHandler = (newMessage) => {
            setAllMessages((prev) => {
                if (prev.some((msg) => msg._id === newMessage._id))
                    return prev;
                const updatedMessages = [...prev, newMessage];
                // Optimized auto-scroll to bottom for new messages
                requestAnimationFrame(() => {
                    const container = containerRef.current;
                    if (container && messagesEndRef.current) {
                        const { scrollTop, scrollHeight, clientHeight } = container;
                        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
                        if (isNearBottom) {
                            // Smooth scroll to bottom
                            container.scrollTo({
                                top: container.scrollHeight,
                                behavior: "smooth",
                            });
                        }
                    }
                });
                return updatedMessages;
            });
        };
        socket.on(`getMessage::${chatId}`, receiveMessageHandler);
        return () => {
            socket.off(`getMessage::${chatId}`, receiveMessageHandler);
            socket.disconnect();
        };
    }, [chatId, socket, containerRef]);
    const handleSendMessage = async () => {
        if (!messageText.trim())
            return;
        try {
            const messageTextToSend = messageText.trim();
            setMessageText("");
            await sendMessageAPI({
                chatId,
                text: messageTextToSend,
                type: "TEXT",
            }).unwrap();
            socket.emit("sendMessage", {
                chatId,
                senderId: myId,
                text: messageTextToSend,
            });
            // Optimized scroll to bottom after sending message
            requestAnimationFrame(() => {
                const container = containerRef.current;
                if (container) {
                    container.scrollTo({
                        top: container.scrollHeight,
                        behavior: "smooth",
                    });
                }
            });
        }
        catch (error) {
            console.error("Failed to send message:", error);
            alert("Failed to send message. Please try again.");
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    // Reset when chat changes
    (0, react_1.useEffect)(() => {
        setCurrentPage(1);
        setAllMessages([]);
        setHasMore(true);
        setIsInitialLoad(true);
        setIsLoadingMore(false);
        setLoadingError(null);
        isScrollingToBottom.current = false;
    }, [chatId]);
    if (isLoading && isInitialLoad) {
        return (0, jsx_runtime_1.jsx)(page_loading_1.PageLoading, {});
    }
    if (isError && isInitialLoad) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex-1 flex items-center justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-12 w-12 text-red-500 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("p", { className: "text-red-500 mb-4", children: "Failed to load chat" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: () => window.location.reload(), variant: "outline", children: "Retry" })] }) }));
    }
    const participant = ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.participant) || {};
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col bg-white min-h-[calc(100vh-128px)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white border-b border-gray-200 p-3 flex items-center justify-between flex-shrink-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: (0, utils_1.getImageUrl)(participant.image || telent_person_png_1.default), alt: participant.name || "User", width: 40, height: 40, className: "rounded-full mr-3" }), (0, jsx_runtime_1.jsx)("h2", { className: "font-semibold", children: participant.name || "Chat" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("div", { className: `w-2 h-2 rounded-full ${isSocketConnected ? "bg-green-500" : "bg-red-500"}` }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-gray-500", children: isSocketConnected ? "Online" : "Offline" })] })] }), (0, jsx_runtime_1.jsxs)("div", { ref: containerRef, className: "flex-1 overflow-y-auto p-4 space-y-3 min-h-0 pb-16 ", style: {
                    scrollBehavior: "auto",
                    maxHeight: containerHeight,
                    height: containerHeight,
                }, children: [(0, jsx_runtime_1.jsx)("div", { ref: triggerRef, className: "h-1 " }), (0, jsx_runtime_1.jsx)(infinite_scroll_loader_1.InfiniteScrollLoaderPresets.Chat, { isLoading: isLoadingMore }), (0, jsx_runtime_1.jsx)(infinite_scroll_loader_1.InfiniteScrollLoaderPresets.Chat, { hasError: !!loadingError, errorMessage: loadingError || undefined, onRetry: handleRetryLoadMore }), (0, jsx_runtime_1.jsx)(infinite_scroll_loader_1.InfiniteScrollLoaderPresets.Chat, { showNoMoreData: !hasMore && allMessages.length > 0 && !isInitialLoad }), allMessages.length === 0 && !isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center h-full text-gray-500", children: (0, jsx_runtime_1.jsx)("p", { children: "No messages yet. Start the conversation!" }) })) : (allMessages.map((message, index) => {
                        const isMyMessage = message.sender.toString() === (myId === null || myId === void 0 ? void 0 : myId.toString());
                        return ((0, jsx_runtime_1.jsx)("div", { className: `flex mb-4  ${isMyMessage ? "justify-end" : "justify-start"}`, children: (0, jsx_runtime_1.jsxs)("div", { className: `max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${isMyMessage
                                    ? "bg-blue-500 text-white rounded-br-md"
                                    : "bg-gray-100 text-gray-800 rounded-bl-md"}`, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm break-words leading-relaxed", children: message.text }), (0, jsx_runtime_1.jsx)("p", { className: `text-xs mt-2 ${isMyMessage ? "text-blue-100" : "text-gray-500"}`, children: new Date(message.createdAt).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        }) })] }) }, index));
                    })), (0, jsx_runtime_1.jsx)("div", { ref: messagesEndRef })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white fixed bottom-1 w-[60%] border-t border-gray-200 p-4 flex space-x-2 flex-shrink-0", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "Type a message...", value: messageText, onChange: (e) => setMessageText(e.target.value), onKeyPress: handleKeyPress, className: "flex-1" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleSendMessage, disabled: !messageText.trim(), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Send, { className: "h-4 w-4" }) })] })] }));
}
