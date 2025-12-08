"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfileSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@/lib/utils");
const userApi_1 = require("@/redux/features/userApi");
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const sonner_1 = require("sonner");
function ProfileSection() {
    const { data: userData, isLoading } = (0, userApi_1.useGetMeQuery)({});
    const [openToWork, setOpenToWork] = (0, react_1.useState)(false);
    const [preview, setPreview] = (0, react_1.useState)(null);
    const [file, setFile] = (0, react_1.useState)(null);
    const [updateProfile, { isLoading: isUpdating }] = (0, userApi_1.useUpdateProfileMutation)();
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if ((_a = userData === null || userData === void 0 ? void 0 : userData.data) === null || _a === void 0 ? void 0 : _a.profile) {
            setOpenToWork((_b = userData.data.profile.openToWork) !== null && _b !== void 0 ? _b : false);
            setPreview((0, utils_1.getImageUrl)(userData.data.image));
        }
    }, [userData]);
    //  Update status instantly to backend
    const handleStatusChange = async (newValue) => {
        setOpenToWork(newValue);
        try {
            const res = await updateProfile({
                body: { openToWork: newValue },
            }).unwrap();
            sonner_1.toast.success("Status updated successfully");
            console.log("Updated in DB:", res);
        }
        catch (err) {
            sonner_1.toast.error("Failed to update status");
            console.error("Update status failed:", err);
        }
    };
    //  Handle file upload and instantly send to backend
    const handleFileChange = async (e) => {
        var _a;
        const selectedFile = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setPreview(imageUrl);
            setFile(selectedFile);
            const formData = new FormData();
            formData.append("image", selectedFile);
            try {
                const res = await updateProfile({ body: formData }).unwrap();
                sonner_1.toast.success("Profile picture updated");
                console.log("Image uploaded:", res);
            }
            catch (err) {
                sonner_1.toast.error("Image upload failed");
                console.error("Image upload failed:", err);
            }
        }
    };
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Loading profile..." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center space-y-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center rounded-full bg-gray-100 p-1 w-[300px] justify-between", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => handleStatusChange(true), disabled: isUpdating, className: (0, utils_1.cn)("flex-1 py-2 text-sm font-medium rounded-full transition", openToWork
                            ? "bg-green-700 text-white"
                            : "text-gray-600 hover:bg-gray-200"), children: isUpdating && openToWork ? "Updating..." : "Open to work" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => handleStatusChange(false), disabled: isUpdating, className: (0, utils_1.cn)("flex-1 py-2 text-sm font-medium rounded-full transition", !openToWork
                            ? "bg-green-700 text-white"
                            : "text-gray-600 hover:bg-gray-200"), children: isUpdating && !openToWork ? "Updating..." : "Not available" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden", children: preview ? ((0, jsx_runtime_1.jsx)(image_1.default, { width: 96, height: 96, src: preview, alt: "Profile Preview", className: "w-full h-full object-cover" })) : ((0, jsx_runtime_1.jsx)("svg", { className: "w-12 h-12 text-green-800", fill: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { d: "M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.7-9.8 4.9V22h19.6v-2.7c0-3.2-6.5-4.9-9.8-4.9z" }) })) }), (0, jsx_runtime_1.jsx)("input", { type: "file", id: "file-upload", className: "hidden", accept: "image/*", onChange: handleFileChange }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "file-upload", className: "px-4 py-1 border border-green-700 rounded text-green-800 text-sm cursor-pointer hover:bg-green-50", children: isUpdating ? "Uploading..." : "Choose File" })] })] }));
}
