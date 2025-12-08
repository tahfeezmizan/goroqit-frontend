/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import LoadingSpinner from "@/lib/loading-spinner";
import { cn, getImageUrl } from "@/lib/utils";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/userApi";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfileSection() {
  const { data: userData, isLoading } = useGetMeQuery({});
  const [preview, setPreview] = useState<string | null>(null);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [openToWorkActive, setOpenToWorkActive] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    if (userData?.profile) {
      setOpenToWorkActive(userData.profile.openToWork ?? false);
      const imgUrl = userData?.image ? getImageUrl(userData.image) : null;
      setPreview(imgUrl);
    }
  }, [userData]);

  const handleStatusChange = async (newValue: boolean) => {
    const previousValue = openToWorkActive;
    setOpenToWorkActive(newValue);

    try {
      const res = await updateProfile({
        body: { openToWork: newValue },
      }).unwrap();
      toast.success(res?.message || "Status updated successfully");
    } catch (error: any) {
      setOpenToWorkActive(previousValue);
      const errorMsg =
        error?.data?.message ||
        error?.data?.errorMessages?.[0]?.message ||
        "Failed to update status";
      toast.error(errorMsg);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        await updateProfile({ body: formData }).unwrap();
        toast.success("Profile picture updated");
      } catch {
        toast.error("Image upload failed");
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  // ✅ ensure valid image URL only if it's non-empty
  const validImage =
    preview && preview.trim() !== ""
      ? preview
      : userData?.image && getImageUrl(userData.image)?.trim() !== ""
      ? getImageUrl(userData.image)
      : null;

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex items-center rounded-full bg-gray-100 p-1 w-[300px] justify-between">
        <button
          onClick={() => handleStatusChange(true)}
          disabled={isUpdating}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-full transition",
            openToWorkActive
              ? "bg-green-700 text-white"
              : "text-gray-600 hover:bg-gray-200"
          )}
        >
          {isUpdating && openToWorkActive ? "Updating..." : "Open to work"}
        </button>

        <button
          onClick={() => handleStatusChange(false)}
          disabled={isUpdating}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-full transition",
            !openToWorkActive
              ? "bg-green-700 text-white"
              : "text-gray-600 hover:bg-gray-200"
          )}
        >
          {isUpdating && !openToWorkActive ? "Updating..." : "Not available"}
        </button>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {validImage ? (
            <Image
              width={200}
              height={200}
              src={validImage}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <CircleUserRound className="size-25 text-gray-500" />
          )}
        </div>

        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="px-4 py-1 border border-green-700 rounded text-green-800 text-sm cursor-pointer hover:bg-green-50"
        >
          {isUpdating ? "Uploading..." : "Choose File"}
        </label>
      </div>
    </div>
  );
}
