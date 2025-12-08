"use client";

import LoadingSpinner from "@/lib/loading-spinner";
import { useGetAllJobsQuery } from "@/redux/features/jobsApi";
import { PostJobFormData } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import RecentJobCard from "./recent-job-card";

export function RecentJob() {
  const { data: jobs, isLoading } = useGetAllJobsQuery('');

  return (
    <section className="bg-[#EBF1FA] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold ">
            Recent Job Circular
          </h2>
          <Link
            href={"/job"}
            className="bg-transparent  text-black hover:text-white hover:bg-green-800 border-2 border-green-900  px-6 py-1 text-lg font-medium rounded-lg duration-300 flex items-center justify-between gap-2"
          >
            Explore all
            <ArrowRight className="w-4 h-4 " />
          </Link>
        </div>

        {/* Job Cards Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs && jobs?.length > 0 ? (
              jobs
                .slice(0, 6)
                .map((job: PostJobFormData) => (
                  <RecentJobCard job={job} key={job._id} />
                ))
            ) : (
              <div className="col-span-full text-center py-8 text-2xl text-gray-500">
                No jobs available
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
