import React from "react";

interface ErrorMessageProps {
  title: string; // e.g., "jobs", "talent", "projects"
}

export default function ErrorMessage({ title }: ErrorMessageProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 overflow-hidden">
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-2">
          Oops! Something went wrong.
        </div>
        <p className="text-gray-400">
          We couldn&apos;t load the {title}. Please refresh the page or try
          again later.
        </p>
      </div>
    </section>
  );
}
