"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategoryQuery } from "@/redux/features/categoryApi";
import {
  useGetAllJobsQuery,
  useUpdateJobMutation,
} from "@/redux/features/jobsApi";
import { Category, JobData, PostJobFormData } from "@/types/types";
import { Calendar } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export function JobUpdateForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PostJobFormData>({
    defaultValues: {
      title: "",
      category: "",
      jobLocation: "",
      type: undefined,
      startDate: undefined,
      endDate: undefined,
      minSalary: 0,
      maxSalary: 0,
      description: "",
      responsibilities: "",
    },
  });
  const { id } = useParams();
  const route = useRouter();

  const { data: categories, isLoading } = useGetAllCategoryQuery({});
  const { data: jobs } = useGetAllJobsQuery({});
  const [updateJob] = useUpdateJobMutation();

  const job = jobs?.find((job: JobData) => job._id === id);

  useEffect(() => {
    if (job) {
      reset({
        title: job.title || "",
        // ✅ Fixed: Extract _id from category object to match SelectItem value
        category: job.category?._id || job.category || "",
        jobLocation: job.jobLocation || "",
        type: job.type || undefined,
        startDate: job.startDate ? job.startDate.split("T")[0] : undefined,
        endDate: job.endDate ? job.endDate.split("T")[0] : undefined,
        minSalary: job.minSalary || 0,
        maxSalary: job.maxSalary || 0,
        description: job.description || "",
        responsibilities: job.responsibilities || "",
      });
    }
  }, [job, reset]);

  const onSubmit = async (data: PostJobFormData) => {
    const updateData = {
      title: data.title,
      category: data.category,
      jobLocation: data.jobLocation,
      type: data.type,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : null,
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
      minSalary: Number(data.minSalary),
      maxSalary: Number(data.maxSalary),
      description: data.description,
      responsibilities: data.responsibilities,
    };

    try {
      const res = await updateJob({
        id: id,
        data: updateData,
      }).unwrap();

      if (res.success) {
        toast.success("✅ Job Update Sucessfully");
        route.push("/recruiter/jobs");
      }
    } catch (error) {
      toast.error("❌ Job creation failed");
      console.error("❌ Job creation failed:", error);
    }
  };

  return (
    <div className="p-6 rounded-lg bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Update Job</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        {/* Job Title */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-lg font-medium text-gray-90">
              Job Title
            </Label>
            <Input
              id="title"
              placeholder="Hair Stylist"
              {...register("title", { required: "Job title is required" })}
              className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Job Category */}
          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-lg font-medium text-gray-90"
            >
              Job Category
            </Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Job category is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.isArray(categories) && categories.length > 0 ? (
                      categories.map((category: Category) => (
                        <SelectItem key={category._id} value={category?.name}>
                          {category?.name}
                        </SelectItem>
                      ))
                    ) : (
                      <p className="px-2 py-1 text-gray-500 text-sm">
                        No categories found
                      </p>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Employment Type */}
          <div className="space-y-3">
            <Label className="text-lg font-medium text-gray-90">
              Employment Type
            </Label>
            <div className="flex items-center gap-4">
              {/* Job Type */}
              <Controller
                name="type"
                control={control}
                rules={{ required: "Job type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full">
                      <SelectValue placeholder="Select Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Temp">Temp</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {/* Engagement Type */}
              <Controller
                name="engagementType"
                control={control}
                rules={{ required: "Engagement type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full">
                      <SelectValue placeholder="Select Engagement Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Salaried">Salaried</SelectItem>
                      <SelectItem value="Self-employed">
                        Self-employed
                      </SelectItem>
                      <SelectItem value="Chair-rental">Chair Rental</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
            {errors.engagementType && (
              <p className="text-red-500 text-sm">
                {errors.engagementType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="jobLocation"
              className="text-lg font-medium text-gray-90"
            >
              Job Location
            </Label>
            <Input
              id="jobLocation"
              placeholder="Enter your locations"
              {...register("jobLocation", {
                required: "jobLocation is required",
              })}
              className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full"
            />
            {errors.jobLocation && (
              <p className="text-red-500 text-sm">
                {errors.jobLocation.message}
              </p>
            )}
          </div>
        </div>

        {/* Date Range and Experience level */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="startDate"
              className="text-lg font-medium text-gray-90"
            >
              Starting Date
            </Label>
            <div className="relative">
              <Input
                id="startDate"
                type="date"
                {...register("startDate", {
                  required: "Starting date is required",
                })}
                className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="experianceLabel"
              className="text-lg font-medium text-gray-90"
            >
              Experience Level
            </Label>
            <Controller
              name="experianceLabel"
              control={control}
              rules={{ required: "Experience Level is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full">
                    <SelectValue placeholder="Select Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Junior">Junior</SelectItem>
                    <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Master">Master</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.experianceLabel && (
              <p className="text-red-500 text-sm">
                {errors.experianceLabel.message}
              </p>
            )}
          </div>
        </div>

        {/* Salary Range with Salary Type */}
        <div className="space-y-2">
          <Label className="text-lg font-medium text-gray-90">
            Salary Range
          </Label>
          <div className="flex gap-4">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Min"
                {...register("minSalary", {
                  required: "Minimum salary is required",
                })}
                className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full"
              />
              <Input
                type="number"
                placeholder="Max"
                {...register("maxSalary", {
                  required: "Maximum salary is required",
                })}
                className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full"
              />
            </div>
            {/* Salary Type Selector */}
            <Controller
              name="salryType"
              control={control}
              rules={{ required: "Salary type is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px] mt-1 p-4 rounded-lg !text-lg text-black bg-gray-50">
                    <SelectValue placeholder="Hourly" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {(errors.minSalary || errors.maxSalary || errors.salryType) && (
            <p className="text-red-500 text-sm">
              Salary information is required
            </p>
          )}
        </div>

        {/* Job Description */}
        <div className="space-y-2">
          <Label
            htmlFor="responsibilities"
            className="text-lg font-medium text-gray-90"
          >
            Job Description
          </Label>

          <Controller
            name="responsibilities"
            control={control}
            rules={{ required: "Job responsibilities are required" }}
            render={({ field }) => {
              const defaultTemplate = `
               <p><strong>Description:</strong></p>
               <br/><br/>
              <p><strong>Responsibilities:</strong></p>
      <br/><br/>  
              <p><strong>About the Business:</strong></p>
            `;

              return (
                <JoditEditor
                  ref={null}
                  value={field.value || defaultTemplate}
                  config={{
                    height: 400,
                    readonly: false,
                  }}
                  onBlur={(newContent) => field.onChange(newContent)}
                  onChange={() => {}}
                />
              );
            }}
          />

          {errors.responsibilities && (
            <p className="text-red-500 text-sm">
              {errors.responsibilities.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 mt-5 text-lg font-medium rounded-lg"
        >
          Update Job
        </Button>
      </form>
    </div>
  );
}
