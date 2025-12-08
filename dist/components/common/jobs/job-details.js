"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobInfo = void 0;
exports.default = JobDetail;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
exports.jobInfo = {
    companyProfile: "Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools to accept payments, expand globally, and manage their businesses online. Stripe has been at the forefront of expanding internet commerce, powering new business models, and supporting the latest platforms, from marketplaces to mobile commerce sites. We believe that growing the GDP of the internet is a problem rooted in code and design, not finance. Stripe is built for developers, makers, and creators. We work on solving the hard technical problems necessary to build global economic infrastructure—from designing highly reliable systems to developing advanced machine learning algorithms to prevent fraud.",
    description: "Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and incentivize others to engage on our channels.",
    responsibilities: [
        "Community engagement to ensure that is supported and actively represented online",
        "Focus on social media content development and publication",
        "Marketing and strategy support",
        "Stay on top of trends on social media platforms, and suggest content ideas to the team",
        "Engage with online communities",
    ],
    whoYouAre: [
        "You get energy from people and building the ideal work environment",
        "You have a sense for beautiful spaces and office experiences",
        "You are a confident office manager, ready for added responsibilities",
        "You're detail-oriented and creative",
        "You're a growth marketer and know how to run campaigns",
    ],
    niceToHaves: [
        "Fluent in English",
        "Project management skills",
        "Copy editing skills",
    ],
};
function JobDetail({ data }) {
    console.log("JobDetail", data);
    return ((0, jsx_runtime_1.jsx)("aside", { className: "w-full  bg-white p-8 rounded-lg", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-8", children: [(0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Company Profile" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 leading-relaxed", children: exports.jobInfo.companyProfile })] }), (0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Description" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 leading-relaxed", children: exports.jobInfo.description })] }), (0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Responsibilities" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-3", children: exports.jobInfo.responsibilities.map((item, index) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircleIcon, { className: "h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" }), (0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: item })] }, index))) })] }), (0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Who You Are" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-3", children: exports.jobInfo.whoYouAre.map((item, index) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircleIcon, { className: "h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" }), (0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: item })] }, index))) })] }), (0, jsx_runtime_1.jsxs)("section", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-gray-900 mb-4", children: "Nice-To-Haves" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-3", children: exports.jobInfo.niceToHaves.map((item, index) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircleIcon, { className: "h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" }), (0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: item })] }, index))) })] })] }) }));
}
