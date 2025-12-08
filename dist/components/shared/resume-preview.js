"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResumePreview;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_pdf_1 = require("react-pdf");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const talentApi_1 = require("@/redux/features/talentApi");
react_pdf_1.pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${react_pdf_1.pdfjs.version}/pdf.worker.min.js`;
function ResumePreview() {
    // Set up the worker
    var _a, _b;
    const { id } = (0, navigation_1.useParams)();
    const { data: talent } = (0, talentApi_1.useGetSingleTalentQuery)(id);
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
    // Fix the double slash issue
    const resumePath = ((_b = (_a = talent === null || talent === void 0 ? void 0 : talent.profile) === null || _a === void 0 ? void 0 : _a.resume) === null || _b === void 0 ? void 0 : _b.startsWith("/"))
        ? talent.profile.resume.slice(1)
        : talent.profile.resume;
    const resumeUrl = `${baseUrl}/${resumePath}`;
    console.log(resumeUrl);
    const [numPages, setNumPages] = (0, react_1.useState)(0);
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full max-w-4xl mx-auto", children: resumeUrl && ((0, jsx_runtime_1.jsx)(react_pdf_1.Document, { file: resumeUrl, onLoadSuccess: ({ numPages }) => setNumPages(numPages), loading: (0, jsx_runtime_1.jsx)("div", { children: "Loading PDF..." }), error: (0, jsx_runtime_1.jsx)("div", { children: "Failed to load PDF" }), children: Array.from(new Array(numPages), (_, index) => ((0, jsx_runtime_1.jsx)("div", { className: "mb-4 shadow-lg", children: (0, jsx_runtime_1.jsx)(react_pdf_1.Page, { pageNumber: index + 1, renderTextLayer: false, renderAnnotationLayer: false, width: 800 }) }, `page_${index + 1}`))) })) }));
}
