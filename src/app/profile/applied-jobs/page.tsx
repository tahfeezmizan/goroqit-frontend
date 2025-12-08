"use client";

import Table from "@/components/shared/table";
import { useGetAppliedJobsQuery } from "@/redux/features/applicationApi";

export default function AppliedJobsPage() {
  // Pass undefined since this endpoint does not require arguments
  const {
    data: appliedJobsData,
    isLoading,
    error,
  } = useGetAppliedJobsQuery(undefined);

  // console.log(appliedJobsData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs</p>;

  return (
    <div className="space-y-7">
      <h2 className="text-2xl font-bold mb-4">Applied Jobs</h2>

      <div className="bg-white rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full bg-white">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Job Title
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Company / Recruiter
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Location
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Applied Date
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <Table appliedJobs={appliedJobsData || []} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
