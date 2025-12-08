"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterSection = NewsletterSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
function NewsletterSection() {
    const [email, setEmail] = (0, react_1.useState)("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("[v0] Newsletter subscription:", email);
        // Handle newsletter subscription logic here
        setEmail("");
    };
    return ((0, jsx_runtime_1.jsx)("section", { className: "bg-[#414652] py-20 px-4", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid lg:grid-cols-2 gap-8 items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl md:text-3xl font-bold text-white text-balance", children: "Subscribe to our Newsletter" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-200 text-md md:text-xl font-normal  md:pr-20", children: "Subscribe for Updates: Stay informed about the latest investor updates, financial results, and announcements by subscribing to our newsletter." })] }), (0, jsx_runtime_1.jsx)("div", { className: "lg:justify-self-end w-full lg:max-w-md bg-[#FFFFFF1A] !text-white overflow-hidden rounded-md", children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "flex ", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { type: "email", placeholder: "Enter your email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "border-none outline-none rounded-lg py-8 !text-xl !text-white" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "bg-white py-8 text-slate-600 hover:bg-gray-100 font-medium px-6 rounded-none ", children: "Subscribe" })] }) })] }) }) }));
}
