
"use client";

import React from "react";
import { useGetTermsQuery } from "@/redux/features/termsApi";
import LoadingSpinner from "@/lib/loading-spinner";

export default function TermsAndConditions() {
  const { data, isLoading, isError } = useGetTermsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    return <LoadingSpinner />;
  }

  const content = data.content;

  return (
    <div className="bg-[#EBF1FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-8 mt-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Terms & Conditions
          </h1>

          {/* Render dynamic HTML */}
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}
