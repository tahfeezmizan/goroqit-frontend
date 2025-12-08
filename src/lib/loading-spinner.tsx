import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin h-8 w-8 border-2 border-green-800 border-t-transparent rounded-full"></div>
      <span className="ml-3 text-gray-600">Loading...</span>
    </div>
  );
}
