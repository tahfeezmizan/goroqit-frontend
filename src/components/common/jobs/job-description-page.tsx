"use client";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format-date";
import LoadingSpinner from "@/lib/loading-spinner";
import {
  useEasyApplyJobMutation,
  useGetSingleJobQuery,
} from "@/redux/features/jobsApi";
import { jwtDecode } from "jwt-decode";
import { useParams, usePathname, useRouter } from "next/navigation";
import { parseCookies } from "nookies"; // lightweight cookie parser
import JobDetail from "./job-details";
import { Jodit } from "jodit-react";
import { toast } from "sonner";
import { ApiResponse } from "@/types/profileTypes";
import { ApiError } from "@/types/types";
import { Loader } from "lucide-react";

type TokenPayload = {
  role?: string;
};

export default function JobDescriptionPage() {
  const { id } = useParams();
  const { data: job, isLoading } = useGetSingleJobQuery({ id });
  const router = useRouter();
  const pathname = usePathname();

  const [easyApply, { isLoading: applyLoading }] =
    useEasyApplyJobMutation(undefined);

  const cookies = parseCookies();
  const token = cookies.token || cookies.user;
  let role: string | undefined;

  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      role = decoded.role;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const handleApplyClick = async () => {
    if (role !== "applicant") {
      router.push(`/login?redirect=${pathname}`);
      return;
    } else {
      try {
        const res = (await easyApply({ job: job?._id })) as {
          data?: ApiResponse;
          error?: ApiError;
        };

        if (res.data?.success) {
          toast.success("Job application submitted successfully!");
          router.push("/profile/applied-jobs");
        } else {
          const errorMessage = res.error?.data?.message;

          toast.error(errorMessage || "Something went wrong");

          if (errorMessage === "Please complete your profile first!") {
            router.push("/profile");
          }
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      // router.push(`/job/${job?.title}/${job?._id}`);
    }
    // Applicant: stay on the same page per requirement
  };

  return (
    <div className="bg-[#EBF1FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden ">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            <div className="col-span-2">
              <JobDetail data={job} />
            </div>
            <div className="col-span-1 space-y-6 ">
              <aside className="w-full bg-white p-6 rounded-lg">
                <div className="space-y-8">
                  {/* About this role */}
                  <section>
                    <div className="mb-5">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {job?.title}
                      </h2>
                      <p className="font-medium text-gray-500">
                        <span> {job?.user?.profile?.companyName}</span>
                        {"  • "}
                        {job?.user?.profile?.location}
                      </p>
                    </div>
                    {/* <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {job?.applicationsCount} applied of {capacity} capacity
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div> */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Apply Before</span>
                        <span className="font-medium text-gray-900">
                          {formatDate(job?.endDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Job Posted On</span>
                        <span className="font-medium text-gray-900">
                          {formatDate(job?.startDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Job Type</span>
                        <span className="font-medium text-gray-900">
                          {job?.type}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary</span>
                        <span className="font-medium text-gray-900">
                          £{job?.minSalary} - £{job?.maxSalary}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Applied</span>
                        <span className="font-medium text-gray-900">
                          {job?.applicationsCount}
                        </span>
                      </div>
                    </div>
                  </section>

                  {/* Categories */}
                  <section>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Categories
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"`}
                      >
                        {job?.category}
                      </span>
                    </div>
                  </section>

                  {/* Required Skills */}
                  {/* <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Required Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {requiredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-50 text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section> */}
                </div>
              </aside>

              {role !== "recruiter" && role !== "admin" && (
                <div>
                  <Button
                    disabled={applyLoading}
                    onClick={handleApplyClick}
                    className="w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 text-lg font-medium rounded-lg"
                  >
                    {applyLoading ? (
                      <Loader className="animate-spin size-8" />
                    ) : (
                      "Apply Now"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
