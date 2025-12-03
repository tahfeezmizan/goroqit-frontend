"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteJobMutation,
  useGetSingleRecruiterJobQuery,
} from "@/redux/features/jobsApi";
import { useGetMeQuery } from "@/redux/features/userApi";
import { PostJobFormData } from "@/types/types";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import TableLoader from "../shared/table-loader";

const tableHeaders = [
  { key: "jobTitle", label: "Job Title" },
  { key: "location", label: "Location" },
  { key: "salary", label: "Salary" },
  { key: "posted", label: "Posted" },
  { key: "applicantCount", label: "Applicant Count" },
  { key: "action", label: "Action" },
];

export function JobPostTable() {
  const page = 1;
  const limit = 10;

  const [deleteJob] = useDeleteJobMutation();
  const { data: userData } = useGetMeQuery(undefined);

  const { data, isLoading, error } = useGetSingleRecruiterJobQuery({
    userId: userData?._id,
    page,
    limit,
  });

  const job = data?.jobs?.data;

  const handleDelete = (id: string | number | undefined) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#009966",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteJob(id).unwrap();
          Swal.fire("Deleted!", "Job has been deleted.", "success");
        } catch {
          Swal.fire(
            "Error!",
            "Failed to delete job. Please try again.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-white overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  className="text-left py-4 px-6 font-semibold text-gray-700"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <TableLoader />
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="py-8 px-6 text-center text-red-600">
                  Error loading jobs. Please try again.
                </td>
              </tr>
            ) : job?.length > 0 ? (
              job?.map((job: PostJobFormData) => (
                <tr
                  key={job._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{job.title}</div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{job.jobLocation}</td>
                  <td className="py-4 px-6 text-gray-700">
                    {job.minSalary} - {job.maxSalary}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {new Date(job.startDate).toLocaleDateString()}
                  </td>

                  <td className="py-4 px-6 text-gray-700">
                    {job.applicationsCount}
                  </td>
                  <td className="py-4 px-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={`/job/${job._id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/recruiter/jobs/${job._id}`}>
                            Edit Job
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(job._id)}
                          className="text-red-700"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 px-6 text-center text-gray-500">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
