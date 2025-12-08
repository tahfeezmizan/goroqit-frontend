"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfiniteScrollLoaderPresets = void 0;
exports.InfiniteScrollLoader = InfiniteScrollLoader;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
function InfiniteScrollLoader({ isLoading = false, hasError = false, errorMessage = "Failed to load more data", onRetry, showNoMoreData = false, noMoreDataMessage = "No more data to load", variant = "default", size = "md", }) {
    // Size configurations
    const sizeConfig = {
        sm: {
            spinner: "h-4 w-4",
            text: "text-xs",
            padding: "py-2",
            button: "text-xs px-2 py-1",
        },
        md: {
            spinner: "h-5 w-5",
            text: "text-sm",
            padding: "py-4",
            button: "text-sm px-3 py-1.5",
        },
        lg: {
            spinner: "h-6 w-6",
            text: "text-base",
            padding: "py-6",
            button: "text-sm px-4 py-2",
        },
    };
    const config = sizeConfig[size];
    // Loading state
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: `flex justify-center ${config.padding}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [variant === "pulse" ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }), (0, jsx_runtime_1.jsx)("div", { className: "w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75" }), (0, jsx_runtime_1.jsx)("div", { className: "w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150" })] })) : variant === "minimal" ? ((0, jsx_runtime_1.jsx)("div", { className: `${config.spinner} border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin` })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: `${config.spinner} animate-spin text-blue-500` })), (0, jsx_runtime_1.jsx)("span", { className: `${config.text} text-gray-600 font-medium`, children: "Loading more messages..." })] }) }));
    }
    // Error state
    if (hasError) {
        return ((0, jsx_runtime_1.jsx)("div", { className: `flex justify-center ${config.padding}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center space-y-2 max-w-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 text-red-500", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: config.spinner }), (0, jsx_runtime_1.jsx)("span", { className: `${config.text} font-medium`, children: errorMessage })] }), onRetry && ((0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: onRetry, variant: "outline", size: "sm", className: `${config.button} border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200`, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { className: "h-3 w-3 mr-1" }), "Try Again"] }))] }) }));
    }
    // No more data state
    if (showNoMoreData) {
        return ((0, jsx_runtime_1.jsx)("div", { className: `flex justify-center ${config.padding}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: `${config.text} text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 shadow-sm`, children: noMoreDataMessage }), (0, jsx_runtime_1.jsx)("div", { className: "absolute -top-1 -left-1 w-2 h-2 bg-gray-300 rounded-full opacity-50" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute -bottom-1 -right-1 w-2 h-2 bg-gray-300 rounded-full opacity-50" })] }) }));
    }
    // Default: no state to show
    return null;
}
// Preset configurations for common use cases
exports.InfiniteScrollLoaderPresets = {
    Chat: (props) => ((0, jsx_runtime_1.jsx)(InfiniteScrollLoader, Object.assign({ variant: "default", size: "md", noMoreDataMessage: "No more messages" }, props))),
    Feed: (props) => ((0, jsx_runtime_1.jsx)(InfiniteScrollLoader, Object.assign({ variant: "pulse", size: "lg", noMoreDataMessage: "You've reached the end" }, props))),
    List: (props) => ((0, jsx_runtime_1.jsx)(InfiniteScrollLoader, Object.assign({ variant: "minimal", size: "sm", noMoreDataMessage: "No more items" }, props))),
};
exports.default = InfiniteScrollLoader;
