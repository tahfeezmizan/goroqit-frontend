"use client";

import { useApplyJobMutation } from "@/redux/features/application";
import { ApiResponse } from "@/types/profileTypes";
import { ApiError, JobApplyFormInputs } from "@/types/types";
import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function JobApplyForm() {
  const params = useParams();
  const { id, slug } = params;
  const route = useRouter();

  const jobTitle = decodeURIComponent(id as string);
  const jobSlug: string = Array.isArray(slug) ? slug[0] : slug ?? "";

  const [applyJob, { isLoading }] = useApplyJobMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<JobApplyFormInputs>();

  const onSubmit = async (data: JobApplyFormInputs) => {
    const resumeFile = data.resume?.[0] || null;

    try {
      const formData = new FormData();
      formData.append("job", jobSlug);
      formData.append("name", data.name);
      formData.append("title", jobTitle);
      formData.append("location", data.location);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("experience", data.experience.toString());

      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      const res = (await applyJob(formData)) as {
        data?: ApiResponse;
        error?: ApiError;
      };

      if (res.data?.success) {
        toast.success("Job application submitted successfully!");
        route.push("/profile/applied-jobs");
      } else {
        const errorMessage = res.error?.data?.message;

        toast.error(errorMessage || "Something went wrong");

        if (errorMessage === "Please complete your profile first!") {
          route.push("/profile");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    }
  };

  // Watch fields for validation display
  const resumeFile = watch("resume")?.[0];

  return (
    <div className="pt-10 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Job Application
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="0000000000"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers are allowed",
                },
                minLength: {
                  value: 7,
                  message: "Phone number must be at least 7 digits",
                },
                // maxLength removed so users can enter >15 digits
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                // remove any non-digit characters while typing
                const digits = target.value.replace(/\D/g, "");
                // keep cursor position reasonably correct by setting value
                target.value = digits;
              }}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="City, Country"
              {...register("location", { required: "Location is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Experience (years)
            </label>
            <input
              type="number"
              id="experience"
              placeholder="Enter your professional experience."
              {...register("experience", {
                required: "Experience is required",
                min: {
                  value: 0,
                  message: "Experience cannot be negative",
                },
                valueAsNumber: true,
              })}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (parseInt(target.value) < 0) target.value = "0"; // Prevent negative numbers
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
            {errors.experience && (
              <p className="text-sm text-red-500">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Resume Upload */}
          <div>
            <label
              htmlFor="resume"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Resume Upload
            </label>
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              {...register("resume", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
            {resumeFile && (
              <p className="mt-1 text-sm text-green-600">
                Selected: {resumeFile.name}
              </p>
            )}
            {errors.resume && (
              <p className="text-sm text-red-500">Resume is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
          >
            {isLoading ? (
              <Loader className="animate-spin size-8 " />
            ) : (
              "Submit Now"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
