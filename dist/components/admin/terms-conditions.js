"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TermsEditor;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const dynamic_1 = __importDefault(require("next/dynamic"));
const sonner_1 = require("sonner");
const termsApi_1 = require("@/redux/features/termsApi");
const JoditEditor = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require("jodit-react"))), { ssr: false });
function TermsEditor() {
    const editor = (0, react_1.useRef)(null);
    const [terms, setTerms] = (0, react_1.useState)("");
    const [lastUpdated, setLastUpdated] = (0, react_1.useState)("");
    // Fetch terms from API
    const { data } = (0, termsApi_1.useGetTermsQuery)();
    const [createTerms, { isLoading: isSaving }] = (0, termsApi_1.useCreateTermsMutation)();
    (0, react_1.useEffect)(() => {
        if (data) {
            setTerms(data.content || "");
            setLastUpdated(data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : "");
        }
    }, [data]);
    const handleSave = async () => {
        try {
            const payload = {
                content: terms,
                type: "terms-and-condition",
            };
            const res = await createTerms(payload).unwrap();
            setLastUpdated(res.updatedAt ? new Date(res.updatedAt).toLocaleDateString() : new Date().toLocaleDateString());
            sonner_1.toast.success("Terms & Conditions saved successfully!");
        }
        catch (err) {
            console.error(err);
            sonner_1.toast.error("Failed to save Terms & Conditions.");
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg border border-gray-200 p-6", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold text-gray-900 mb-6", children: "Terms & Conditions Editor" }), (0, jsx_runtime_1.jsx)(JoditEditor, { ref: editor, value: terms, onChange: (newContent) => setTerms(newContent), config: {
                    readonly: false,
                    height: 400,
                    toolbarButtonSize: "middle",
                } }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mt-6 pt-6 border-t border-gray-200", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-500", children: ["Last Updated On: ", (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: lastUpdated })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleSave, className: "bg-green-600 hover:bg-green-700 text-white px-6 py-2", disabled: isSaving, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "w-4 h-4 mr-2" }), "Save Terms & Conditions"] })] })] }));
}
