import Image from "next/image";
import Link from "next/link";
import whiteLogo from "@/assets/white-logo.png";

function AppleStoreIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-91.9-61.7-91.9zm-56.4-164c26.8-32.2 22.8-68.9 21.6-77.7-23.7 1.7-52.6 16.3-68.4 34.6-16.1 18.4-23.4 44.4-20.9 74 26.6 2 53.6-14.7 67.7-30.9z" />
    </svg>
  );
}

function GooglePlayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#06281A] text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & App Download section */}
          <div className="col-span-1 space-y-4">
            <Link href={"/"}>
              <Image
                src={whiteLogo}
                alt="Logo"
                width={165}
                height={40}
                className="w-40 h-auto"
              />
            </Link>
            <p className="text-xs text-gray-300 font-medium">Download the GoRoqit App</p>
            {/* Side-by-side buttons in footer */}
            <div className="flex flex-row flex-wrap gap-2.5 items-center">
              <a
                href="https://apps.apple.com/app/go-roqit/id6771160907"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-black/60 hover:bg-black border border-white/20 hover:border-white/40 text-white rounded-xl transition-all shadow-sm"
              >
                <AppleStoreIcon className="w-4.5 h-4.5 text-white flex-shrink-0" />
                <div className="text-left">
                  <p className="text-[8px] uppercase tracking-wider text-gray-300 font-medium leading-none">
                    Download on
                  </p>
                  <p className="text-xs font-bold leading-tight mt-0.5">App Store</p>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.luke.go_roqit_app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-black/60 hover:bg-black border border-white/20 hover:border-white/40 text-white rounded-xl transition-all shadow-sm"
              >
                <GooglePlayIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-[8px] uppercase tracking-wider text-gray-300 font-medium leading-none">
                    GET IT ON
                  </p>
                  <p className="text-xs font-bold leading-tight mt-0.5">Google Play</p>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/job"
                  className="text-gray-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Find Jobs
                </Link>
              </li>

              <li>
                <Link
                  href="/pricing"
                  className="text-gray-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="text-gray-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/app-download"
                  className="text-gray-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Download Mobile App
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Help Centre
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-gray-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-gray-200 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="bg-[#414652] py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-300 text-sm">
            © 2025 GoRoqit · All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
