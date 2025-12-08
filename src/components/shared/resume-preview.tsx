"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetSingleTalentQuery } from "@/redux/features/talentApi";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ResumePreview() {
  // Set up the worker

  const { id }: { id: string } = useParams();
  const { data: talent } = useGetSingleTalentQuery(id);

  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  // Fix the double slash issue
  const resumePath = talent?.profile?.resume?.startsWith("/")
    ? talent.profile.resume.slice(1)
    : talent.profile.resume;
  const resumeUrl = `${baseUrl}/${resumePath}`;

  const [numPages, setNumPages] = useState<number>(0);
  return (
    <div className="w-full max-w-4xl mx-auto">
      {resumeUrl && (
        <Document
          file={resumeUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<div>Loading PDF...</div>}
          error={<div>Failed to load PDF</div>}
        >
          {/* Render all pages as images */}
          {Array.from(new Array(numPages), (_, index) => (
            <div key={`page_${index + 1}`} className="mb-4 shadow-lg">
              <Page
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={800}
              />
            </div>
          ))}
        </Document>
      )}
    </div>
  );
}
