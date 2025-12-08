/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { FileText, X, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/userApi";
import { ApiError } from "@/types/types";

interface Props {
  currentResume?: string; // e.g., "/resume/1758834611063-0mvkla.pdf"
}

export function ResumeUpload({ currentResume }: Props) {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { refetch: refetchUser } = useGetMeQuery({});

  useEffect(() => {
    if (currentResume) {
      const parts = currentResume.split("/");
      const filename = parts[parts.length - 1];
      setUploadedFile(filename);

      // Always set preview URL for existing resumes
      const fullUrl = currentResume.startsWith("http")
        ? currentResume
        : `${process.env.NEXT_PUBLIC_API_URL || ""}${currentResume}`;

      // Set preview for all existing resumes (we'll check file type in render)
      setPreviewUrl(fullUrl);
    } else {
      setUploadedFile(null);
      setPreviewUrl(null);
    }
  }, [currentResume]);

  const processFileUpload = async (file: File) => {
    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid file type (PDF, DOC, DOCX, or TXT)");
      return;
    }

    // Validate file size (e.g., 10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setUploadedFile(file.name);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await updateProfile({ body: formData }).unwrap();
      toast.success("Resume uploaded successfully!");

      // Refetch user data to get updated resume path
      // const updatedUser = await refetchUser();

      // Set preview URL based on the response from server
      if (res.resume) {
        const fullUrl = res.resume.startsWith("http")
          ? res.resume
          : `${process.env.NEXT_PUBLIC_API_URL || ""}${res.resume}`;
        setPreviewUrl(fullUrl);
      } else {
        // Fallback: use object URL for immediate preview
        if (file.type === "application/pdf") {
          setPreviewUrl(URL.createObjectURL(file));
        } else {
          setPreviewUrl(null);
        }
      }
    } catch (err: ApiError | any) {
      toast.error(err?.data?.message || "Failed to upload resume");
      console.error("Resume upload failed:", err);
      setUploadedFile(null);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await processFileUpload(file);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    await processFileUpload(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleRemoveResume = async () => {
    if (!confirm("Are you sure you want to remove your resume?")) return;

    try {
      const res = await updateProfile({ body: { resume: null } }).unwrap();
      toast.success("Resume removed successfully!");
      setUploadedFile(null);
      setPreviewUrl(null);

      // Refetch user data to reflect the change
      await refetchUser();

      // console.log("Resume removed from DB:", res);
    } catch (err: ApiError | any) {
      toast.error(err?.data?.message || "Failed to remove resume");
      console.error("Resume removal failed:", err);
    }
  };

  const downloadResume = () => {
    if (currentResume) {
      // Create a proper download URL - adjust this based on your backend setup
      const downloadUrl = currentResume.startsWith("http")
        ? currentResume
        : `${process.env.NEXT_PUBLIC_API_URL || ""}${currentResume}`;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = uploadedFile || "resume.pdf";
      link.target = "_blank"; // Open in new tab as fallback
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Upload instructions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Upload your recent resume or CV
          </h2>
          <p className="text-lg font-medium text-gray-900">
            Upload your most up-to-date resume
          </p>
          <p className="text-base text-gray-500">
            File types: DOC, DOCX, PDF, TXT (Max 10MB)
          </p>

          {uploadedFile && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Current Resume
                    </p>
                    <p className="text-sm text-green-600">{uploadedFile}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleRemoveResume}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right side - Upload area and preview */}
        <div className="space-y-4">
          {/* Upload area */}
          <div
            className={`border border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragOver
                ? "border-blue-400 bg-blue-50"
                : isLoading
                ? "border-gray-200 bg-gray-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center space-y-4">
              <div
                className={`p-3 rounded-full ${
                  isLoading ? "bg-gray-100" : "bg-blue-50"
                }`}
              >
                {isLoading ? (
                  <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full" />
                ) : (
                  <Upload className="h-8 w-8 text-blue-600" />
                )}
              </div>
              <div className="space-y-2">
                {!isLoading ? (
                  <>
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <span className="text-blue-600 font-medium hover:text-blue-800">
                        Choose file or drag here
                      </span>
                      <input
                        id="resume-upload"
                        type="file"
                        accept=".doc,.docx,.pdf,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={isLoading}
                      />
                    </label>
                    <p className="text-sm text-gray-500">
                      Drag and drop your resume here
                    </p>
                  </>
                ) : (
                  <p className="text-gray-600">Uploading resume...</p>
                )}
              </div>
            </div>
          </div>

          {/* PDF Preview - Show for current resume OR newly uploaded PDF */}
        </div>
      </div>
      {previewUrl &&
        ((currentResume && currentResume.toLowerCase().includes(".pdf")) ||
          (uploadedFile && uploadedFile.toLowerCase().endsWith(".pdf"))) && (
          <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Resume Preview
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={downloadResume}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Download
                </button>
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Hide preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="relative">
              <iframe
                src={`${previewUrl}#view=FitH`}
                width="100%"
                height={600}
                title="Resume Preview"
                className="border-0"
                onLoad={() => console.log("PDF loaded successfully")}
                onError={(e) => {
                  console.error("PDF preview error:", e);
                  toast.error("Could not load PDF preview");
                }}
              />
            </div>
          </div>
        )}

      {/* Non-PDF file indicator */}
      {currentResume &&
        uploadedFile &&
        !currentResume.toLowerCase().includes(".pdf") && (
          <div className="border rounded-lg p-6 text-center bg-gray-50">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Preview not available for this file type (
              {uploadedFile.split(".").pop()?.toUpperCase()})
            </p>
            <button
              onClick={downloadResume}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Download to view
            </button>
          </div>
        )}

      {/* Show preview button if preview is hidden */}
      {currentResume &&
        currentResume.toLowerCase().includes(".pdf") &&
        !previewUrl && (
          <div className="text-center">
            <button
              onClick={() => {
                const fullUrl = currentResume.startsWith("http")
                  ? currentResume
                  : `${process.env.NEXT_PUBLIC_API_URL || ""}${currentResume}`;
                setPreviewUrl(fullUrl);
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Show PDF Preview
            </button>
          </div>
        )}
    </div>
  );
}
