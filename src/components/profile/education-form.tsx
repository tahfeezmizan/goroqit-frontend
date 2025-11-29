/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useAddEducationMutation,
  useGetMeQuery,
  useDeleteEducationMutation,
} from "@/redux/features/userApi";
import LoadingSpinner from "@/lib/loading-spinner";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Swal from "sweetalert2";

interface EducationData {
  degreeTitle: string;
  major: string;
  instituteName: string;
  yearOfPassing: string;
  duration: string;
  certificate?: File | null | undefined;
}

export function EducationForm() {
  const { register, handleSubmit, reset, setValue } = useForm<EducationData>({
    defaultValues: {
      degreeTitle: "",
      major: "",
      instituteName: "",
      yearOfPassing: "",
      duration: "",
      certificate: null,
    },
  });

  // Get user data
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch,
  } = useGetMeQuery("");

  const [addEducation, { isLoading }] = useAddEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();

  const education = userData?.profile?.education;

  console.log(education)

  const onSubmit = async (data: EducationData) => {
    const formData = new FormData();
    formData.append("degreeTitle", data.degreeTitle);
    formData.append("major", data.major);
    formData.append("instituteName", data.instituteName);
    formData.append("yearOfPassing", data.yearOfPassing);
    formData.append("duration", data.duration);
    if (data.certificate) {
      formData.append("certificate", data.certificate);
    }

    try {
      const res = await addEducation({ body: formData }).unwrap();

      if (res?.success) {
        toast.success("Education added successfully!");
        reset();
        refetch(); // Refresh the data to show the new education
      }

      console.log("Education added successfully:", res);
    } catch {
      console.log("error");
    }

    // If you want to see the file details specifically
    if (data.certificate) {
      // If you want to log as base64 (for images)
      if (data.certificate.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          // console.log("Certificate as Base64:", e.target?.result);
        };
        reader.readAsDataURL(data.certificate);
      }
    }
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue("certificate", file);
  };

  // Handle delete education
  // const handleDeleteEducation = async (index: number) => {
  //   try {
  //     const res = await deleteEducation({ index }).unwrap();
  //     console.log("Delete", index, res);

  //     if (res?.success) {
  //       toast.success("Education deleted successfully!");
  //       refetch(); // Refresh the data to reflect the deletion
  //     }

  //     console.log("Education deleted successfully:", res);
  //   } catch (error) {
  //     console.log("Error deleting education:", error);
  //     toast.error("Failed to delete education");
  //   }
  // };
  const handleDeleteEducation = async (title: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteEducation({ title }).unwrap();

        if (res?.success) {
          Swal.fire(
            "Deleted!",
            "Education has been deleted successfully.",
            "success"
          );
          refetch();
        }

        console.log("Education deleted successfully:", res);
      } catch (error) {
        console.log("Error deleting education:", error);
        Swal.fire("Error!", "Failed to delete education.", "error");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Level of Education Section */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">
          Level of Education
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="degreeTitle"
            >
              Qualification Type
            </Label>
            <Input
              id="degreeTitle"
              {...register("degreeTitle", { required: true })}
              placeholder="e.g. NVQ Level 2 in Barbering"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="major"
            >
              Level / Year Completed
            </Label>
            <Input
              id="major"
              {...register("major", { required: true })}
              placeholder="e.g. Level 3 (Completed 2022)"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="instituteName"
            >
              Institution / Training Provider
            </Label>
            <Input
              id="instituteName"
              {...register("instituteName", { required: true })}
              placeholder="e.g. London Hair Academy or City & Guilds"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="yearOfPassing"
            >
              Year of Passing
            </Label>
            <Input
              id="yearOfPassing"
              {...register("yearOfPassing", { required: true })}
              placeholder="e.g. 2022"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="certificate"
            >
              Upload Certificate
            </Label>
            <Input
              id="certificate"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="mt-1 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="duration"
            >
              Duration / Hours
            </Label>
            <Input
              id="duration"
              {...register("duration", { required: true })}
              placeholder="e.g. 6 months full-time or 120 hours"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Add Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="flex gap-2 bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="h-4 w-4" />
          {isLoading ? "Adding..." : "Add Education"}
        </Button>
      </form>

      {/* Education Display List */}
      {(education?.length > 0 || isUserLoading) && (
        <div>
          <h4 className="text-2xl font-semibold text-gray-900 mb-4">
            {isUserLoading ? (
              <LoadingSpinner />
            ) : (
              `Added Education (${education?.length})`
            )}
          </h4>

          {isUserLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              {education?.map((p: EducationData, index: number) => (
                <div
                  key={`portfolio-${index}`}
                  className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-gray-900">
                        {p?.degreeTitle}
                      </h5>
                      <p className="text-gray-600 mb-2">{p?.instituteName}</p>
                      <div className="grid grid-cols-8 gap-3 mt-3">
                        {/* {p?.certificate?.map((img: string, idx: number) => ( */}
                        <Image
                          key={`edu-cert-${index}`}
                          src={getImageUrl(p?.certificate?.toString() || "")}
                          alt={p?.degreeTitle}
                          width={200}
                          height={200}
                          className="w-40 h-32 object-cover rounded-md border"
                        />
                        {/* ))} */}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteEducation(p?.degreeTitle);
                        }}
                        size="sm"
                        variant="outline"
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
