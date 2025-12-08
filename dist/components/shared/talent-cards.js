"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TalentCards;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@/lib/utils");
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
const badge_1 = require("../ui/badge");
function TalentCards({ talent }) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    // Safely handle skills data - convert to array if it's a string or ensure it's an array
    const safeSkills = react_1.default.useMemo(() => {
        if (!talent.skills)
            return [];
        if (Array.isArray(talent.skills)) {
            return talent.skills;
        }
        if (typeof talent.skills === "string") {
            // If it's a comma-separated string, split it
            return talent.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill.length > 0);
        }
        return [];
    }, [talent.skills]);
    // Safely handle work experience
    const safeWorkExperience = react_1.default.useMemo(() => {
        if (!talent.workExperience)
            return [];
        if (Array.isArray(talent.workExperience)) {
            return talent.workExperience;
        }
        return [];
    }, [talent.workExperience]);
    // Safely handle country/location
    const location = talent.country || talent.city || "Location not specified";
    return ((0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg overflow-hidden border border-gray-200", children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: `/find-talent/${(_a = talent === null || talent === void 0 ? void 0 : talent.userId) === null || _a === void 0 ? void 0 : _a._id}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-4 bg-gray-100 space-y-3 relative", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-2 bg-white p-1 rounded-md w-40 absolute right-4 shadow", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-4 w-4 text-green-600" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-gray-700", children: "Available For work" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mt-8", children: (0, jsx_runtime_1.jsx)("div", { className: "relative h-32", children: ((_b = talent === null || talent === void 0 ? void 0 : talent.userId) === null || _b === void 0 ? void 0 : _b.image) ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: (0, utils_1.getImageUrl)(talent.userId.image), alt: ((_c = talent === null || talent === void 0 ? void 0 : talent.userId) === null || _c === void 0 ? void 0 : _c.name) || "Talent", width: 120, height: 120, className: "rounded-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-[120px] h-[120px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500", children: (0, jsx_runtime_1.jsx)(lucide_react_1.CircleUserRound, { className: "size-40" }) })) }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-base font-medium text-gray-600 text-center leading-relaxed", children: (talent === null || talent === void 0 ? void 0 : talent.expartes) && ((_d = talent === null || talent === void 0 ? void 0 : talent.expartes) === null || _d === void 0 ? void 0 : _d.length) > 0 ? ((_e = talent === null || talent === void 0 ? void 0 : talent.expartes) === null || _e === void 0 ? void 0 : _e.map((s, i) => {
                                var _a;
                                return ((0, jsx_runtime_1.jsxs)("span", { children: [s, i < ((_a = talent === null || talent === void 0 ? void 0 : talent.expartes) === null || _a === void 0 ? void 0 : _a.length) - 1 && ", "] }, i));
                            })) : ((0, jsx_runtime_1.jsx)("span", { children: "Not Provided" })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-5", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-2xl font-bold text-gray-900 text-center mb-4", children: ((_f = talent === null || talent === void 0 ? void 0 : talent.userId) === null || _f === void 0 ? void 0 : _f.name) || "Luke Dolan" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Briefcase, { className: "w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg leading-tight text-gray-700", children: "5 years experience" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 ", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Scissors, { className: "w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg leading-tight text-gray-700", children: (talent === null || talent === void 0 ? void 0 : talent.skills) && ((_g = talent === null || talent === void 0 ? void 0 : talent.skills) === null || _g === void 0 ? void 0 : _g.length) > 0 ? ((_h = talent === null || talent === void 0 ? void 0 : talent.skills) === null || _h === void 0 ? void 0 : _h.map((s, i) => {
                                                var _a;
                                                return ((0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "outline", className: "mx-0.5", children: [s, i < ((_a = talent === null || talent === void 0 ? void 0 : talent.skills) === null || _a === void 0 ? void 0 : _a.length) - 1 && ""] }, i));
                                            })) : ((0, jsx_runtime_1.jsx)("span", { children: "Not Provided" })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Globe, { className: "text-green-800" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-800 font-medium", children: location })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-4", children: safeWorkExperience.length > 0 ? (safeWorkExperience.map((exp, index) => ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-4", children: (0, jsx_runtime_1.jsxs)("span", { className: "text-gray-800", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex gap-2 font-medium", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BriefcaseBusiness, { className: "text-green-800" }), (exp === null || exp === void 0 ? void 0 : exp.jobTitle) || "Position not specified"] }), (exp === null || exp === void 0 ? void 0 : exp.companyName) && `@ ${exp.companyName}`, (exp === null || exp === void 0 ? void 0 : exp.employmentType) && ` (${exp.employmentType})`] }) }, index)))) : ((0, jsx_runtime_1.jsx)("p", { className: "text-gray-800 italic", children: "No experience added yet" })) })] })] })] }) }, talent.id));
}
