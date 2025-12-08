"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = Pagination;
exports.PaginationContent = PaginationContent;
exports.PaginationLink = PaginationLink;
exports.PaginationItem = PaginationItem;
exports.PaginationPrevious = PaginationPrevious;
exports.PaginationNext = PaginationNext;
exports.PaginationEllipsis = PaginationEllipsis;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const button_1 = require("@/components/ui/button");
function Pagination(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ role: "navigation", "aria-label": "pagination", "data-slot": "pagination", className: (0, utils_1.cn)("mx-auto flex w-full justify-center", className) }, props)));
}
function PaginationContent(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("ul", Object.assign({ "data-slot": "pagination-content", className: (0, utils_1.cn)("flex flex-row items-center gap-1", className) }, props)));
}
function PaginationItem(_a) {
    var props = __rest(_a, []);
    return (0, jsx_runtime_1.jsx)("li", Object.assign({ "data-slot": "pagination-item" }, props));
}
function PaginationLink(_a) {
    var { className, isActive, size = "icon" } = _a, props = __rest(_a, ["className", "isActive", "size"]);
    return ((0, jsx_runtime_1.jsx)("a", Object.assign({ "aria-current": isActive ? "page" : undefined, "data-slot": "pagination-link", "data-active": isActive, className: (0, utils_1.cn)((0, button_1.buttonVariants)({
            variant: isActive ? "outline" : "ghost",
            size,
        }), className) }, props)));
}
function PaginationPrevious(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsxs)(PaginationLink, Object.assign({ "aria-label": "Go to previous page", size: "default", className: (0, utils_1.cn)("gap-1 px-2.5 sm:pl-2.5", className) }, props, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeftIcon, {}), (0, jsx_runtime_1.jsx)("span", { className: "hidden sm:block", children: "Previous" })] })));
}
function PaginationNext(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsxs)(PaginationLink, Object.assign({ "aria-label": "Go to next page", size: "default", className: (0, utils_1.cn)("gap-1 px-2.5 sm:pr-2.5", className) }, props, { children: [(0, jsx_runtime_1.jsx)("span", { className: "hidden sm:block", children: "Next" }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRightIcon, {})] })));
}
function PaginationEllipsis(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsxs)("span", Object.assign({ "aria-hidden": true, "data-slot": "pagination-ellipsis", className: (0, utils_1.cn)("flex size-9 items-center justify-center", className) }, props, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MoreHorizontalIcon, { className: "size-4" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "More pages" })] })));
}
