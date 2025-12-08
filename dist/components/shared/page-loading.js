"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageLoading = PageLoading;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
function PageLoading() {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const pathname = (0, navigation_1.usePathname)();
    (0, react_1.useEffect)(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 400);
        return () => clearTimeout(timer);
    }, [pathname]);
    if (!isLoading)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-white z-50 flex items-center justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-900 mb-4" }), (0, jsx_runtime_1.jsx)("p", { className: "text-green-900 font-medium", children: "Loading..." })] }) }));
}
