"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/lib/loading-spinner";
import { getImageUrl } from "@/lib/utils";

import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/userApi";

interface EssentialPersonalData {
  name: string;
  email: string;
}

export default function MergedProfileForm() {
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch,
  } = useGetMeQuery({});

  const profileData = userData?.profile;
  const [preview, setPreview] = useState<string | null>(null);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  console.log(userData);

  // === React Hook Form setup ===
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EssentialPersonalData>({
    defaultValues: {
      name: "",
    },
  });

  // === Populate form fields and preview ===
  useEffect(() => {
    if (profileData) {
      reset({
        name: userData.name || "",
        email: userData.email || "",
      });
    }

    if (userData?.image) {
      setPreview(getImageUrl(userData.image));
    }
  }, [profileData, reset, userData]);

  // === Profile image handler ===
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
        refetch();
      } catch {
        toast.error("Image upload failed");
      }
    }
  };

  // === Submit personal info ===
  const onSubmit = async (data: EssentialPersonalData) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    try {
      const res = await updateProfile({ body: formData });
      if (res?.data?.success) {
        toast.success("Profile updated successfully");
        refetch();
      } else {
        toast.error(res?.data?.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error?.toString() || "Error updating profile");
    }
  };

  if (isUserLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-10 max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
        Personal Details
      </h3>

      {/* === Profile Image Section === */}
      <div className="flex flex-col items-start space-y-4">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {preview ? (
            <Image
              width={1000}
              height={1000}
              src={preview}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <CircleUserRound className="size-24 text-gray-500" />
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

      {/* === Personal Info Form === */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-lg text-gray-900">
              Name
            </Label>
            <Input
              id="name"
              placeholder="John"
              {...register("name", { required: true })}
              className="mt-1 p-4 !text-xl text-black bg-gray-50"
            />
            {errors.name && (
              <p className="text-sm text-red-500">First name is required</p>
            )}
          </div>

          {/* <div>
            <Label htmlFor="emails" className="text-lg text-gray-900">
              Email
            </Label>
            <Input
              id="email"
              placeholder="example@example.com"
              {...register("email", { required: true })}
              className="mt-1 p-4 text-black bg-gray-50"
            />
            {errors.email && (
              <p className="text-sm text-red-500">Email is required</p>
            )}
          </div> */}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="bg-green-900 hover:bg-green-800 text-white px-6 py-3 text-lg font-medium"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
