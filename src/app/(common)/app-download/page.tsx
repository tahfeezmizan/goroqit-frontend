"use client";

import Image from "next/image";
import React from "react";
import {
  ShieldCheck,
  Zap,
  Bell,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import appMockup from "../../../../public/app.png";

// Custom SVG Icons for Apple and Google Play Store Badges
function AppleStoreIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-91.9-61.7-91.9zm-56.4-164c26.8-32.2 22.8-68.9 21.6-77.7-23.7 1.7-52.6 16.3-68.4 34.6-16.1 18.4-23.4 44.4-20.9 74 26.6 2 53.6-14.7 67.7-30.9z" />
    </svg>
  );
}

function GooglePlayIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
}

const keyFeatures = [
  {
    icon: Bell,
    title: "Instant Push Alerts",
    description: "Get immediate notifications for new job matches and application updates.",
  },
  {
    icon: Zap,
    title: "1-Tap Quick Apply",
    description: "Apply in seconds with your saved profile and resume anywhere.",
  },
  {
    icon: MessageSquare,
    title: "Direct In-App Messaging",
    description: "Chat seamlessly with hiring managers and applicants in real-time.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Secure",
    description: "100% encrypted authentication and verified company profiles.",
  },
];

export default function AppDownloadPage() {
  return (
    <div className="bg-[#EBF1FA] min-h-screen pt-28 pb-20">
      {/* 1. Header Information Text */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-900/10 border border-green-900/20 text-green-900 text-sm font-semibold">
          <Sparkles className="w-4 h-4 text-green-700" />
          <span>Official GoRoqit Mobile Application</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Get the <span className="text-green-900">GoRoqit</span> App
        </h1>

        <p className="text-base sm:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
          Find your dream job or recruit top talent on the go. Fast, intuitive, and available for Apple iOS & Android devices.
        </p>
      </section>

      {/* 2. Large Mockup Image Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="w-full">
          <Image
            src={appMockup}
            alt="GoRoqit Mobile App Showcase"
            width={1400}
            height={800}
            priority
            className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl"
          />
        </div>
      </section>

      {/* 3. Download Buttons - Side by Side on all screen sizes including mobile */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-16">
        <div className="flex flex-row justify-center items-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          {/* Apple App Store */}
          <a
            href="https://apps.apple.com/app/go-roqit/id6771160907"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial flex items-center justify-center sm:justify-start gap-2 sm:gap-3.5 px-3.5 sm:px-7 py-3.5 sm:py-4 bg-black hover:bg-zinc-800 text-white rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            <AppleStoreIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white flex-shrink-0" />
            <div className="text-left">
              <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-300 font-medium leading-none">
                Download on the
              </p>
              <p className="text-xs sm:text-lg font-bold leading-tight mt-0.5 whitespace-nowrap">App Store</p>
            </div>
          </a>

          {/* Google Play Store */}
          <a
            href="#google-download"
            onClick={(e) => {
              e.preventDefault();
              alert("Directing to Google Play Store...");
            }}
            className="flex-1 sm:flex-initial flex items-center justify-center sm:justify-start gap-2 sm:gap-3.5 px-3.5 sm:px-7 py-3.5 sm:py-4 bg-black hover:bg-zinc-800 text-white rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            <GooglePlayIcon className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400 flex-shrink-0" />
            <div className="text-left">
              <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-gray-300 font-medium leading-none">
                GET IT ON
              </p>
              <p className="text-xs sm:text-lg font-bold leading-tight mt-0.5 whitespace-nowrap">Google Play</p>
            </div>
          </a>
        </div>
      </section>

      {/* 4. Minimal Additional Info / Key Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-green-900 mx-auto">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
