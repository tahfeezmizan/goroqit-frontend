import Image from "next/image";
import Link from "next/link";
import whiteLogo from "@/assets/white-logo.png";

export function Footer() {
  return (
    <footer className="bg-[#06281A] text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo section */}
          <div className="col-span-1">
            <Link href={"/"}>
              <Image
                src={whiteLogo}
                alt="Logo"
                width={165}
                height={40}
                className="w-40 h-auto"
              />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/job"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Find Jobs
                </Link>
              </li>

              <li>
                <Link
                  href="/pricing"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="text-gray-200 hover:text-white transition-colors"
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
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Help Centre
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-200 hover:text-white transition-colors"
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
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="terms-and-conditions"
                  className="text-gray-200 hover:text-white transition-colors"
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
