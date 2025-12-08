"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialsSection = TestimonialsSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const react_1 = require("react");
const image_1 = __importDefault(require("next/image"));
const testimonials = [
    {
        id: 1,
        quote: "I found a new chair rental in less than a week. Roqit made it super easy — just a few taps and I was in the salon!",
        author: "Sarah, Hair Stylist (London)",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        featured: false,
    },
    {
        id: 2,
        quote: "I found a new chair rental in less than a week. Roqit made it super easy — just a few taps and I was in the salon!",
        author: "Sarah, Hair Stylist (London)",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        featured: true,
    },
    {
        id: 3,
        quote: "I found a new chair rental in less than a week. Roqit made it super easy — just a few taps and I was in the salon!",
        author: "Sarah, Hair Stylist (London)",
        avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        featured: false,
    },
    {
        id: 4,
        quote: "Amazing platform for finding creative opportunities. The process was seamless and I connected with great clients quickly.",
        author: "Mike, Makeup Artist (NYC)",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        featured: false,
    },
    {
        id: 5,
        quote: "Roqit transformed how I find work. The social-style profiles really help showcase my portfolio and connect with the right people.",
        author: "Emma, Beauty Specialist (LA)",
        avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        featured: false,
    },
];
const Curly_hair_pana_1_png_1 = __importDefault(require("../../../../public/Curly hair-pana 1.png"));
function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = (0, react_1.useState)(1); // Start with featured testimonial
    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };
    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };
    const getVisibleTestimonials = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex - 1 + i + testimonials.length) % testimonials.length;
            visible.push(Object.assign(Object.assign({}, testimonials[index]), { position: i }));
        }
        return visible;
    };
    return ((0, jsx_runtime_1.jsx)("section", { className: "py-20 px-4 bg-[#EBF1FA]", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto  px-4 sm:px-6 ", children: [(0, jsx_runtime_1.jsx)("div", { className: "hidden lg:block w-[450px] h-[450px] -ml-32 -mb-56", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: Curly_hair_pana_1_png_1.default.src, alt: "testimonial image", width: 500, height: 500, className: "w-full h-full" }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-center mb-16", children: (0, jsx_runtime_1.jsx)("h2", { className: "text-3xl lg:text-4xl font-bold text-gray-900 mb-4", children: "Trusted by Creatives Like you" }) }), (0, jsx_runtime_1.jsx)("div", { className: "hidden lg:block", children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-3 gap-8 mb-8", children: getVisibleTestimonials().map((testimonial, index) => ((0, jsx_runtime_1.jsxs)("div", { className: `bg-white rounded-2xl p-8 shadow-md transition-all duration-300 ${index === 1 ? "translate-y-6 " : "bg-[#b9b9b9] blur-xs "}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-6 ", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Quote, { className: `w-16 h-16 ${index === 1 ? "text-emerald-600 " : "text-gray-300"}` }) }), (0, jsx_runtime_1.jsx)("blockquote", { className: `text-lg leading-relaxed mb-8 font-medium ${index === 1 ? "text-gray-900" : "text-gray-500"}`, children: testimonial.quote }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-full overflow-hidden", children: (0, jsx_runtime_1.jsx)(image_1.default, { width: 52, height: 52, src: testimonial.avatar, alt: testimonial.author, className: "w-full h-full object-cover" }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("p", { className: `font-semibold text-sm ${index === 1 ? "text-gray-900" : "text-gray-500"}`, children: ["\u2014 ", testimonial.author] }) })] })] }, `${testimonial.id}-${currentIndex}`))) }) }), (0, jsx_runtime_1.jsx)("div", { className: "lg:hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-md mx-auto mb-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-2xl p-8 shadow-xl", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-6", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Quote, { className: "w-16 h-16 text-emerald-600" }) }), (0, jsx_runtime_1.jsx)("blockquote", { className: "text-gray-900 text-lg leading-relaxed mb-8 font-medium", children: testimonials[currentIndex].quote }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-full overflow-hidden", children: (0, jsx_runtime_1.jsx)(image_1.default, { width: 52, height: 52, src: testimonials[currentIndex].avatar, alt: testimonials[currentIndex].author, className: "w-full h-full object-cover" }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("p", { className: "text-gray-900 font-semibold text-sm", children: ["\u2014 ", testimonials[currentIndex].author] }) })] })] }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-end gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", onClick: prevTestimonial, className: "w-10 h-10 rounded-full hover:bg-white/50 transition-all duration-300", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { className: "w-5 h-5 text-gray-600" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-1", children: testimonials.map((_, index) => ((0, jsx_runtime_1.jsx)("button", { onClick: () => setCurrentIndex(index), className: `w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "bg-green-900 w-6"
                                    : "bg-gray-400 hover:bg-gray-500"}` }, index))) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", onClick: nextTestimonial, className: "w-10 h-10 rounded-full hover:bg-white/50 transition-all duration-300", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "w-5 h-5 text-gray-600" }) })] })] }) }));
}
