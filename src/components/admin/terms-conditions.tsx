/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import {
  TermsData,
  useCreateTermsMutation,
  useGetTermsQuery,
} from "@/redux/features/termsApi";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function TermsEditor() {
  const editor = useRef<any>(null);
  const [terms, setTerms] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Fetch terms from API
  const { data } = useGetTermsQuery();
  const [createTerms, { isLoading: isSaving }] = useCreateTermsMutation();

  useEffect(() => {
    if (data) {
      setTerms(data.content || "");
      setLastUpdated(
        data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : ""
      );
    }
  }, [data]);

  // Memoize the config to prevent unnecessary re-renders
  const config = useMemo(
    () => ({
      readonly: false,
      height: 600,
      toolbarButtonSize: "middle" as const, // Use const assertion for literal type
      enableDragAndDropFileToEditor: true,
      uploader: {
        insertImageAsBase64URI: true,
      },
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_only_text" as const,
      allowTabNavigation: false,
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "link",
        "|",
        "align",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
      showXPathInStatusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarAdaptive: false,
    }),
    []
  );

  // Use useCallback for the change handler
  const handleChange = useCallback((newContent: string) => {
    setTerms(newContent);
  }, []);

  const handleSave = async () => {
    try {
      const payload: TermsData = {
        content: terms,
        type: "terms-and-condition",
      };
      const res = await createTerms(payload).unwrap();
      setLastUpdated(
        res.updatedAt
          ? new Date(res.updatedAt).toLocaleDateString()
          : new Date().toLocaleDateString()
      );
      toast.success("Terms & Conditions saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Terms & Conditions.");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Terms & Conditions Editor
      </h2>

      <JoditEditor
        ref={editor}
        value={terms}
        config={config}
        onChange={handleChange}
      />

      {/* Footer Info */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Last Updated On: <span className="font-medium">{lastUpdated}</span>
        </p>

        <Button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
          disabled={isSaving}
        >
          <FileText className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Terms & Conditions"}
        </Button>
      </div>
    </div>
  );
}
