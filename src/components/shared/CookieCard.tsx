"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CookieCard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 365 });
    setVisible(false);
  };

  const handleReject = () => {
    Cookies.set("cookie_consent", "rejected", { expires: 365 });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-[#EBF1FA] text-black rounded-2xl shadow-xl w-96 p-5 flex flex-col gap-3 animate-fade-in">
      <div className="flex items-start gap-2">
        <span className="text-xl">🍪</span>
        <div>
          <h2 className="font-semibold text-lg">We use cookies by the way</h2>
          <p className="text-sm text-gray-800">
            Cookies enhance your experience and help us improve our website.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <button
          onClick={handleAccept}
          className="bg-green-900 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition"
        >
          accept all
        </button>
        <button
          onClick={handleReject}
          className="bg-[#444] text-white font-medium py-2 rounded-lg hover:bg-[#555] transition"
        >
          reject non-essential
        </button>
        {/* <button
          onClick={() => alert('Here you can show custom cookie settings!')}
          className="text-gray-400 text-sm hover:underline"
        >
          more options
        </button> */}
      </div>
    </div>
  );
}
