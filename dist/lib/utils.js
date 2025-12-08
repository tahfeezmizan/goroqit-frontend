"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageUrl = void 0;
exports.cn = cn;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
const getImageUrl = (imagePath) => {
    if (!imagePath)
        return "/default.png";
    return `http://10.10.7.62:5001/${imagePath}`;
};
exports.getImageUrl = getImageUrl;
