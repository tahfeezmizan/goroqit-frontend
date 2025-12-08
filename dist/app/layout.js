"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const google_1 = require("next/font/google");
require("./globals.css");
const react_1 = require("react");
const redux_provider_1 = __importDefault(require("@/provider/redux-provider"));
const sonner_1 = require("@/components/ui/sonner");
const montserrat = (0, google_1.Montserrat)({
    variable: "--font-Montserrat",
    subsets: ["latin"],
});
exports.metadata = {
    title: "Find Salon Jobs & Hire Beauty Professionals | Roqit",
    description: "Discover salon, barber, and beauty job opportunities. Hire verified hair stylists, color specialists, and beauty experts instantly with Roqit – the smart talent marketplace.",
    keywords: [
        "salon jobs",
        "beauty jobs",
        "barber jobs",
        "hire hairstylists",
        "hair stylist jobs",
        "beauty professionals",
        "salon recruitment",
        "hairdresser jobs",
        "Roqit careers",
    ],
    authors: [{ name: "Roqit" }],
    openGraph: {
        type: "website",
        url: "https://www.roqit.com/",
        title: "Find Salon Jobs & Hire Beauty Professionals | Roqit",
        description: "Roqit connects salons, barbers, and beauty creatives with fresh talent and opportunities. Find verified professionals, browse job listings, and hire instantly.",
        images: [
            {
                url: "https://www.roqit.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Roqit – Find Salon Jobs & Hire Beauty Professionals",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Find Salon Jobs & Hire Beauty Professionals | Roqit",
        description: "Search beauty jobs or hire talented hairstylists instantly. Join Roqit – the smart salon & beauty hiring platform.",
        images: ["https://www.roqit.com/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
    metadataBase: new URL("https://www.roqit.com"),
};
function RootLayout({ children, }) {
    return ((0, jsx_runtime_1.jsx)("html", { lang: "en", children: (0, jsx_runtime_1.jsx)("body", { className: `${montserrat.variable}`, children: (0, jsx_runtime_1.jsxs)(redux_provider_1.default, { children: [(0, jsx_runtime_1.jsx)(react_1.Suspense, { children: children }), (0, jsx_runtime_1.jsx)(sonner_1.Toaster, {})] }) }) }));
}
