"use client";

import { JobPostTable } from "@/components/recruiter/job-post-table";
import { useGetMeQuery } from "@/redux/features/userApi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function JobPostPage() {
  const { data } = useGetMeQuery(undefined);
  const router = useRouter();

  const handlePostJobClick = (e: React.MouseEvent) => {
    // Profile completion check
    if (data?.profileCompletion < 70) {
      e.preventDefault();
      import("sonner").then(({ toast }) => {
        toast.error(
          "Please complete at least 80% of your profile to post a job."
        );
      });
      router.push("/recruiter/company");
      return;
    }

    // Subscription check
    if (data?.subscribe === false) {
      e.preventDefault();
      import("sonner").then(({ toast }) => {
        toast.error("Please purchase a plan first.");
      });
      router.push("/pricing");
    }
  };

  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Job Posts</h2>
        <div className="">
          <Link
            href={data?.subscribe === false ? "#" : "/recruiter/jobs/post-job"}
            onClick={handlePostJobClick}
            className="bg-green-900 hover:bg-green-800 text-white px-8 py-2 text-lg font-medium rounded-lg"
          >
            Post Job
          </Link>
        </div>
      </div>
      <JobPostTable />
    </div>
  );
}
