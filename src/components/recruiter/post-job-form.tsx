// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useGetAllCategoryQuery } from "@/redux/features/categoryApi";
// import { useCreateJobMutation } from "@/redux/features/jobsApi";
// import { Category, PostJobFormData } from "@/types/types";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { Calendar } from "lucide-react";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner";

// // ✅ FIXED: dynamically load JoditEditor with no SSR
// const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// export function PostJobForm() {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<PostJobFormData>({
//     defaultValues: {
//       title: "",
//       category: "",
//       jobLocation: "",
//       type: undefined,
//       startDate: undefined,
//       engagementType: "",
//       minSalary: 0,
//       maxSalary: 0,
//       description: "",
//       responsibilities: "",
//       experianceLabel: undefined,
//     },
//   });

//   const route = useRouter();
//   const [createJob] = useCreateJobMutation();
//   const { data: categories } = useGetAllCategoryQuery(undefined);

//   const onSubmit = async (data: PostJobFormData) => {

//     try {
//       const res = await createJob({
//         title: data.title,
//         category: data.category,
//         jobLocation: data.jobLocation,
//         experianceLabel: data.experianceLabel,
//         type: data.type,
//         startDate: data.startDate
//           ? new Date(data.startDate).toISOString()
//           : null,
//         // endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
//         minSalary: Number(data.minSalary),
//         maxSalary: Number(data.maxSalary),
//         description: data.description,
//         responsibilities: data.responsibilities,
//       }).unwrap();

//       if (res.success) {
//         toast.success("✅ Job Createed Sucessfully");
//         route.push("/recruiter/jobs");
//       } else {

//         toast.error("❌ Job creation failed");
//       }
//     } catch (error) {
//       // ✅ Type the error properly
//       const err = error as FetchBaseQueryError & {
//         data?: { message?: string };
//       };

//       const errorMessage =
//         err?.data?.message ||
//         (typeof err.data === "string" ? err.data : undefined) ||
//         "❌ Job creation failed";

//       toast.error(errorMessage);
//       console.error("❌ Job creation failed:", err);

//       // ✅ Redirect user if an error occurs
//       route.push("/recruiter/company");
//     }
//   };

//   return (
//     <div className="p-6 rounded-lg bg-white min-h-[600px]">
//       <h2 className="text-3xl font-bold text-gray-900 mb-6">Post a new job</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
//         {/* Job Title */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="title" className="text-lg font-medium text-gray-90">
//               Job Title
//             </Label>
//             <Input
//               id="title"
//               placeholder="Hair Stylist"
//               {...register("title", { required: "Job title is required" })}
//               className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full"
//             />
//             {errors.title && (
//               <p className="text-red-500 text-sm">{errors.title.message}</p>
//             )}
//           </div>

//           {/* Job Category */}
//           <div className="space-y-2">
//             <Label
//               htmlFor="category"
//               className="text-lg font-medium text-gray-90"
//             >
//               Job Category
//             </Label>
//             <Controller
//               name="category"
//               control={control}
//               rules={{ required: "Job category is required" }}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full">
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {Array.isArray(categories) && categories.length > 0 ? (
//                       categories.map((category: Category) => (
//                         <SelectItem key={category._id} value={category?.name}>
//                           {category?.name}
//                         </SelectItem>
//                       ))
//                     ) : (
//                       <p className="px-2 py-1 text-gray-500 text-sm">
//                         No categories found
//                       </p>
//                     )}
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.category && (
//               <p className="text-red-500 text-sm">{errors.category.message}</p>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           {/* Employment Type */}
//           <div className="space-y-3">
//             <Label className="text-lg font-medium text-gray-90">
//               Employment Type
//             </Label>
//             {/* <Controller
//               name="type"
//               control={control}
//               rules={{ required: "Employment type is required" }}
//               render={({ field }) => (
//                 <RadioGroup
//                   value={field.value}
//                   onValueChange={field.onChange}
//                   className="flex items-center space-x-8"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="Full-time" id="Full-time" />
//                     <Label
//                       htmlFor="Full-time"
//                       className="text-md font-medium text-gray-600"
//                     >
//                       Full-time
//                     </Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="Remote" id="Remote" />
//                     <Label
//                       htmlFor="Remote"
//                       className="text-md font-medium text-gray-600"
//                     >
//                       Remote
//                     </Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="Freelance" id="Freelance" />
//                     <Label
//                       htmlFor="Freelance"
//                       className="text-md font-medium text-gray-600"
//                     >
//                       Freelance
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               )}
//             /> */}
//             <div className="flex items-center gap-4">
//               {/* Job Type */}
//               <Controller
//                 name="type"
//                 control={control}
//                 rules={{ required: "Job type is required" }}
//                 render={({ field }) => (
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <SelectTrigger className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full">
//                       <SelectValue placeholder="Select Job Type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Full-time">Full-time</SelectItem>
//                       <SelectItem value="Part-time">Part-time</SelectItem>
//                       <SelectItem value="Temp">Temp</SelectItem>
//                       {/* <SelectItem value="Self-employed">
//                         Self-employed
//                       </SelectItem>
//                       <SelectItem value="Chair-rental">Chair-rental</SelectItem> */}
//                     </SelectContent>
//                   </Select>
//                 )}
//               />

//               {/* Engagement Type */}
//               <Controller
//                 name="engagementType"
//                 control={control}
//                 rules={{ required: "Engagement type is required" }}
//                 render={({ field }) => (
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <SelectTrigger className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full">
//                       <SelectValue placeholder="Select Engagement Type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Salaried">Salaried</SelectItem>
//                       <SelectItem value="Self-employed">
//                         Self-employed
//                       </SelectItem>
//                       <SelectItem value="Chair-rental">Chair Rental</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//             </div>

//             {errors.type && (
//               <p className="text-red-500 text-sm">{errors.type.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label
//               htmlFor="jobLocation"
//               className="text-lg font-medium text-gray-90"
//             >
//               Job Location
//             </Label>
//             <Input
//               id="jobLocation"
//               placeholder="Enter your locations"
//               {...register("jobLocation", {
//                 required: "jobLocation is required",
//               })}
//               className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full"
//             />
//             {errors.jobLocation && (
//               <p className="text-red-500 text-sm">
//                 {errors.jobLocation.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Date Range and Expricen level */}
//         <div className="grid grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label
//               htmlFor="startDate"
//               className="text-lg font-medium text-gray-90"
//             >
//               Starting Date
//             </Label>
//             <div className="relative">
//               <Input
//                 id="startDate"
//                 type="date"
//                 {...register("startDate", {
//                   required: "Starting date is required",
//                 })}
//                 className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full pl-10"
//               />
//               <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             </div>
//             {errors.startDate && (
//               <p className="text-red-500 text-sm">{errors.startDate.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label
//               htmlFor="experianceLabel"
//               className="text-lg font-medium text-gray-90"
//             >
//               Experience Level
//             </Label>
//             <Controller
//               name="experianceLabel"
//               control={control}
//               rules={{ required: "Experience Level is required" }}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full">
//                     <SelectValue placeholder="Select Expricene Level" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Junior">Junior Barber</SelectItem>
//                     <SelectItem value="Mid-Level">Mid-Level Barber</SelectItem>
//                     <SelectItem value="Senior">Senior Barber</SelectItem>
//                     <SelectItem value="Master">Master Barber</SelectItem>
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.experianceLabel && (
//               <p className="text-red-500 text-sm">
//                 {errors.experianceLabel.message}
//               </p>
//             )}
//           </div>
//           {/* <div className="space-y-2">
//             <Label
//               htmlFor="endDate"
//               className="text-lg font-medium text-gray-90"
//             >
//               End date
//             </Label>
//             <div className="relative">
//               <Input
//                 id="endDate"
//                 type="date"
//                 {...register("endDate", { required: "End date is required" })}
//                 className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full pl-10"
//               />
//               <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             </div>
//             {errors.endDate && (
//               <p className="text-red-500 text-sm">{errors.endDate.message}</p>
//             )}
//           </div> */}
//         </div>

//         {/* Salary Range */}
//         <div className="space-y-2">
//           <Label className="text-lg font-medium text-gray-90">
//             Salary Range
//           </Label>
//           <div className="grid grid-cols-2 gap-4">
//             <Input
//               type="number"
//               placeholder="Min"
//               {...register("minSalary", {
//                 required: "Minimum salary is required",
//               })}
//               className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full"
//             />
//             <Input
//               type="number"
//               placeholder="Max"
//               {...register("maxSalary", {
//                 required: "Maximum salary is required",
//               })}
//               className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full"
//             />
//           </div>
//           {(errors.minSalary || errors.maxSalary) && (
//             <p className="text-red-500 text-sm">Salary range is required</p>
//           )}
//         </div>

//         {/* Job Description */}
//         {/* <div className="space-y-2">
//           <Label
//             htmlFor="description"
//             className="text-lg font-medium text-gray-90"
//           >
//             Job Description
//           </Label>
//           <Textarea
//             id="description"
//             placeholder="Describe the role"
//             {...register("description", {
//               required: "Job description is required",
//             })}
//             className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full min-h-[120px] resize-none"
//           />
//           {errors.description && (
//             <p className="text-red-500 text-sm">{errors.description.message}</p>
//           )}
//         </div> */}

//         {/* Job Responsibilities - FIXED */}
//         {/* <div className="space-y-2">
//           <Label
//             htmlFor="responsibilities"
//             className="text-lg font-medium text-gray-90"
//           >
//             Job Description
//           </Label>
//           <Controller
//             name="responsibilities"
//             control={control}
//             rules={{ required: "Job responsibilities are required" }}
//             render={({ field }) => {
//               // Don't create ref inside render callback
//               return (
//                 <JoditEditor
//                   ref={null}
//                   value={field.value || ""}
//                   config={{
//                     height: 250,
//                     readonly: false,
//                   }}
//                   // Use onBlur instead of onChange for better stability
//                   onBlur={(newContent) => field.onChange(newContent)}
//                   onChange={() => {}} // prevent React from re-rendering every keystroke
//                 />
//               );
//             }}
//           />
//           {errors.responsibilities && (
//             <p className="text-red-500 text-sm">
//               {errors.responsibilities.message}
//             </p>
//           )}
//         </div> */}

//         <div className="space-y-2">
//           <Label
//             htmlFor="responsibilities"
//             className="text-lg font-medium text-gray-90"
//           >
//             Job Description
//           </Label>

//           <Controller
//             name="responsibilities"
//             control={control}
//             rules={{ required: "Job responsibilities are required" }}
//             render={({ field }) => {
//               const defaultTemplate = `
//          <p><strong>Description:</strong></p>
//          <br/><br/>
//         <p><strong>Responsibilities:</strong></p>
// <br/><br/>
//         <p><strong>About the Business:</strong></p>
//       `;

//               return (
//                 <JoditEditor
//                   ref={null}
//                   value={field.value || defaultTemplate}
//                   config={{
//                     height: 400,
//                     readonly: false,
//                   }}
//                   onBlur={(newContent) => field.onChange(newContent)}
//                   onChange={() => {}}
//                 />
//               );
//             }}
//           />

//           {errors.responsibilities && (
//             <p className="text-red-500 text-sm">
//               {errors.responsibilities.message}
//             </p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <Button
//           type="submit"
//           className="w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 mt-5 text-lg font-medium rounded-lg"
//         >
//           Job post
//         </Button>
//       </form>
//     </div>
//   );
// }
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
import { useCreateJobMutation } from "@/redux/features/jobsApi";
import { Category, PostJobFormData } from "@/types/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Calendar, Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

// ✅ Dynamic import for Jodit Editor
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export function PostJobForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PostJobFormData>({
    defaultValues: {
      title: "",
      category: "",
      jobLocation: "",
      type: undefined,
      startDate: undefined,
      engagementType: "",
      paymentType: "hourly",
      minSalary: 0,
      maxSalary: 0,
      rent: 0,
      description: "",
      responsibilities: "",
      experianceLabel: undefined,
    },
  });

  const watchEngagementType = watch("engagementType");

  const route = useRouter();
  const [createJob, { isLoading }] = useCreateJobMutation();
  const { data: categories } = useGetAllCategoryQuery(undefined);

  const onSubmit = async (data: PostJobFormData) => {
    try {
      const res = await createJob({
        title: data.title,
        category: data.category,
        jobLocation: data.jobLocation,
        experianceLabel: data.experianceLabel,
        type: data.type,
        startDate: data.startDate
          ? new Date(data.startDate).toISOString()
          : null,
        engagementType: data.engagementType,
        paymentType: data.paymentType,
        minSalary:
          data.engagementType !== "Chair-rental"
            ? Number(data.minSalary)
            : undefined,
        maxSalary:
          data.engagementType !== "Chair-rental"
            ? Number(data.maxSalary)
            : undefined,
        rent:
          data.engagementType === "Chair-rental"
            ? Number(data.rent)
            : undefined,
        description: data.description,
        responsibilities: data.responsibilities,
      }).unwrap();

      if (res.success) {
        toast.success("✅ Job Created Successfully");
        route.push("/recruiter/jobs");
      } else {
        toast.error("❌ Job creation failed");
      }
    } catch (error) {
      const err = error as FetchBaseQueryError & {
        data?: { message?: string };
      };

      const errorMessage =
        err?.data?.message ||
        (typeof err.data === "string" ? err.data : undefined) ||
        "❌ Job creation failed";

      toast.error(errorMessage);
      console.error("❌ Job creation failed:", err);
      route.push("/recruiter/company");
    }
  };

  return (
    <div className="p-6 rounded-lg bg-white min-h-[600px]">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Post a new job</h2>
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

          {/* Category */}
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
          {/* Job Type + Engagement Type */}
          <div className="space-y-3">
            <Label className="text-lg font-medium text-gray-90">
              Employment Type
            </Label>
            <div className="flex items-center gap-4">
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

          {/* Job Location */}
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

        {/* Salary / Rent Conditional */}
        {watchEngagementType !== "Chair-rental" ? (
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

              <Controller
                name="paymentType"
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

            {(errors.minSalary || errors.maxSalary || errors.paymentType) && (
              <p className="text-red-500 text-sm">
                Salary information is required
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="rent" className="text-lg font-medium text-gray-90">
              Rent
            </Label>

            <div className="flex gap-4">
              <Input
                id="rent"
                type="number"
                placeholder="Enter rent amount"
                {...register("rent", { required: "Rent amount is required" })}
                className="mt-1 p-4 rounded-lg bg-gray-50 !text-lg text-black w-full"
              />
              <Controller
                name="paymentType"
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

            {errors.rent && (
              <p className="text-red-500 text-sm">{errors.rent.message}</p>
            )}
          </div>
        )}

        {/* Date + Experience */}
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

        <Button
          type="submit"
          className="w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 mt-5 text-lg font-medium rounded-lg"
        >
          {isLoading ? <Loader className="animate-spin size-8" /> : "Job post"}
        </Button>
      </form>
    </div>
  );
}
