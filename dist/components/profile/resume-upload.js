"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeUpload = ResumeUpload;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const sonner_1 = require("sonner");
const userApi_1 = require("@/redux/features/userApi");
function ResumeUpload({ currentResume }) {
    var _a;
    const [uploadedFile, setUploadedFile] = (0, react_1.useState)(null);
    const [previewUrl, setPreviewUrl] = (0, react_1.useState)(null);
    const [dragOver, setDragOver] = (0, react_1.useState)(false);
    const [updateProfile, { isLoading }] = (0, userApi_1.useUpdateProfileMutation)();
    const { refetch: refetchUser } = (0, userApi_1.useGetMeQuery)({});
    (0, react_1.useEffect)(() => {
        if (currentResume) {
            const parts = currentResume.split("/");
            const filename = parts[parts.length - 1];
            setUploadedFile(filename);
            // Always set preview URL for existing resumes
            const fullUrl = currentResume.startsWith("http")
                ? currentResume
                : `${process.env.NEXT_PUBLIC_API_URL || ""}${currentResume}`;
            // Set preview for all existing resumes (we'll check file type in render)
            setPreviewUrl(fullUrl);
        }
        else {
            setUploadedFile(null);
            setPreviewUrl(null);
        }
    }, [currentResume]);
    const processFileUpload = async (file) => {
        var _a;
        // Validate file type
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
        ];
        if (!allowedTypes.includes(file.type)) {
            sonner_1.toast.error("Please upload a valid file type (PDF, DOC, DOCX, or TXT)");
            return;
        }
        // Validate file size (e.g., 10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            sonner_1.toast.error("File size must be less than 10MB");
            return;
        }
        setUploadedFile(file.name);
        const formData = new FormData();
        formData.append("resume", file);
        try {
            const res = await updateProfile({ body: formData }).unwrap();
            sonner_1.toast.success("Resume uploaded successfully!");
            console.log("Resume updated in DB:", res);
            // Refetch user data to get updated resume path
            const updatedUser = await refetchUser();
            // Set preview URL based on the response from server
            if (res.resume) {
                const fullUrl = res.resume.startsWith("http")
                    ? res.resume
                    : `${process.env.NEXT_PUBLIC_API_URL || ""}${res.resume}`;
                setPreviewUrl(fullUrl);
            }
            else {
                // Fallback: use object URL for immediate preview
                if (file.type === "application/pdf") {
                    setPreviewUrl(URL.createObjectURL(file));
                }
                else {
                    setPreviewUrl(null);
                }
            }
        }
        catch (err) {
            sonner_1.toast.error(((_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.message) || "Failed to upload resume");
            console.error("Resume upload failed:", err);
            setUploadedFile(null);
        }
    };
    const handleFileUpload = async (event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        await processFileUpload(file);
    };
    const handleDrop = async (event) => {
        var _a;
        event.preventDefault();
        setDragOver(false);
        const file = (_a = event.dataTransfer.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        await processFileUpload(file);
    };
    const handleDragOver = (event) => {
        event.preventDefault();
        setDragOver(true);
    };
    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragOver(false);
    };
    const handleRemoveResume = async () => {
        var _a;
        if (!confirm("Are you sure you want to remove your resume?"))
            return;
        try {
            const res = await updateProfile({ body: { resume: null } }).unwrap();
            sonner_1.toast.success("Resume removed successfully!");
            setUploadedFile(null);
            setPreviewUrl(null);
            // Refetch user data to reflect the change
            await refetchUser();
            console.log("Resume removed from DB:", res);
        }
        catch (err) {
            sonner_1.toast.error(((_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.message) || "Failed to remove resume");
            console.error("Resume removal failed:", err);
        }
    };
    const downloadResume = () => {
        if (currentResume) {
            // Create a proper download URL - adjust this based on your backend setup
            const downloadUrl = currentResume.startsWith("http")
                ? currentResume
                : `${process.env.NEXT_PUBLIC_API_URL || ""}${currentResume}`;
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = uploadedFile || "resume.pdf";
            link.target = "_blank"; // Open in new tab as fallback
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-semibold text-gray-900 mb-4", children: "Upload your recent resume or CV" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-medium text-gray-900", children: "Upload your most up-to-date resume" }), (0, jsx_runtime_1.jsx)("p", { className: "text-base text-gray-500", children: "File types: DOC, DOCX, PDF, TXT (Max 10MB)" }), uploadedFile && ((0, jsx_runtime_1.jsx)("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-5 w-5 text-green-600" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-green-800", children: "Current Resume" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-green-600", children: uploadedFile })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex space-x-2", children: (0, jsx_runtime_1.jsx)("button", { onClick: handleRemoveResume, className: "text-sm text-red-600 hover:text-red-800 font-medium", children: "Remove" }) })] }) }))] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: (0, jsx_runtime_1.jsx)("div", { className: `border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${dragOver
                                ? "border-blue-400 bg-blue-50"
                                : isLoading
                                    ? "border-gray-200 bg-gray-50"
                                    : "border-gray-300 hover:border-gray-400"}`, onDrop: handleDrop, onDragOver: handleDragOver, onDragLeave: handleDragLeave, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: `p-3 rounded-full ${isLoading ? "bg-gray-100" : "bg-blue-50"}`, children: isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { className: "h-8 w-8 text-blue-600" })) }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: !isLoading ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: "resume-upload", className: "cursor-pointer", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-blue-600 font-medium hover:text-blue-800", children: "Choose file or drag here" }), (0, jsx_runtime_1.jsx)("input", { id: "resume-upload", type: "file", accept: ".doc,.docx,.pdf,.txt", onChange: handleFileUpload, className: "hidden", disabled: isLoading })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500", children: "Drag and drop your resume here" })] })) : ((0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Uploading resume..." })) })] }) }) })] }), previewUrl &&
                ((currentResume && currentResume.toLowerCase().includes(".pdf")) ||
                    (uploadedFile && uploadedFile.toLowerCase().endsWith(".pdf"))) && ((0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg overflow-hidden bg-white shadow-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-gray-50 px-4 py-3 border-b flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-gray-700", children: "Resume Preview" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("button", { onClick: downloadResume, className: "text-sm text-blue-600 hover:text-blue-800 font-medium", children: "Download" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setPreviewUrl(null), className: "text-gray-400 hover:text-gray-600", title: "Hide preview", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "relative", children: (0, jsx_runtime_1.jsx)("iframe", { src: `${previewUrl}#view=FitH`, width: "100%", height: 600, title: "Resume Preview", className: "border-0", onLoad: () => console.log("PDF loaded successfully"), onError: (e) => {
                                console.error("PDF preview error:", e);
                                sonner_1.toast.error("Could not load PDF preview");
                            } }) })] })), currentResume &&
                uploadedFile &&
                !currentResume.toLowerCase().includes(".pdf") && ((0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-6 text-center bg-gray-50", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-12 w-12 text-gray-400 mx-auto mb-2" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-600 mb-2", children: ["Preview not available for this file type (", (_a = uploadedFile.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toUpperCase(), ")"] }), (0, jsx_runtime_1.jsx)("button", { onClick: downloadResume, className: "text-blue-600 hover:text-blue-800 font-medium", children: "Download to view" })] })), currentResume &&
                currentResume.toLowerCase().includes(".pdf") &&
                !previewUrl && ((0, jsx_runtime_1.jsx)("div", { className: "text-center", children: (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                        const fullUrl = currentResume.startsWith("http")
                            ? currentResume
                            : `${process.env.NEXT_PUBLIC_API_URL || ""}${currentResume}`;
                        setPreviewUrl(fullUrl);
                    }, className: "text-blue-600 hover:text-blue-800 font-medium", children: "Show PDF Preview" }) }))] }));
}
