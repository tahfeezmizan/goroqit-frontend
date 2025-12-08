// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import LoadingSpinner from "@/lib/loading-spinner";
// import { useGetAllJobswithStaticsQuery } from "@/redux/features/jobsApi";
// import { Column } from "@/types/types";
// import { Calendar, Trash2, Users } from "lucide-react";
// import { useMemo, useState } from "react";
// import { StatsCard } from "../shared/stats-card";
// import { Button } from "../ui/button";
// import AdminTable from "./table";

// // Define the shape of each job row including extras
// interface JobRow {
//   serial: number;
//   title: string;
//   category: string;
//   type: string;
//   jobLocation: string;
//   applicationsCount: number;
//   salaryRange: string;
//   action?: React.ReactNode;
// }

// export default function Jobs() {
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const { data, isLoading } = useGetAllJobswithStaticsQuery({ page, limit });

//   const meta = data?.meta;
//   // Memoize jobs to make it stable
//   const jobs = useMemo(() => data?.data || [], [data?.data]);

//   const handleView = (userId: string) => {
//     console.log("View user:", userId);
//   };

//   const handleDelete = (userId: string) => {
//     console.log("Delete user:", userId);
//   };

//   // Add serial + salary formatting
//   const jobsWithExtras: JobRow[] = useMemo(
//     () =>
//       jobs.map((job: any, index: number) => ({
//         serial: (page - 1) * limit + index + 1,
//         title: job.title,
//         category: job.category,
//         type: job.type,
//         jobLocation: job.jobLocation,
//         applicationsCount: job.applicationsCount,
//         salaryRange: `£${job.minSalary} - £${job.maxSalary}`,
//         action: (
//           <Button
//             variant={"ghost"}
//             onClick={() => handleDelete(job._id)}
//             className="flex items-center gap-2 rounded-full text-red-600 bg-red-400/10 hover:bg-red-600/90 hover:text-white duration-300"
//           >
//             <Trash2 className="size-4" />
//             Delete
//           </Button>
//         ),
//       })),
//     [jobs, page, limit]
//   );

//   // Columns definition for AdminTable
//   const columns: Column<JobRow>[] = useMemo(
//     () => [
//       { key: "serial", label: "Serial No." },
//       { key: "title", label: "Job Title" },
//       { key: "category", label: "Category" },
//       { key: "type", label: "Type" },
//       { key: "jobLocation", label: "Location" },
//       { key: "applicationsCount", label: "Applications" },
//       { key: "salaryRange", label: "Salary Range" },
//       { key: "action", label: "Action" },
//     ],
//     []
//   );

//   // Stats for StatsCard
//   const stats = useMemo(
//     () => [
//       {
//         title: "Total Job Posted",
//         value: meta?.total?.toLocaleString() || "0",
//         change: "+8.5%",
//         changeText: "Up from yesterday",
//         icon: Calendar,
//       },
//       {
//         title: "Active Jobs",
//         value: jobs.length.toLocaleString(),
//         change: "+8.5%",
//         changeText: "Up from yesterday",
//         icon: Users,
//       },
//       {
//         title: "Applications",
//         value: meta?.totalApplications?.toLocaleString() || "0",
//         change: "+8.5%",
//         changeText: "Up from yesterday",
//         icon: Calendar,
//       },
//     ],
//     [jobs.length, meta]
//   );

//   return (
//     <div>
//       <StatsCard stats={stats} />

//       {isLoading ? (
//         <LoadingSpinner />
//       ) : (
//         <AdminTable<JobRow>
//           data={jobsWithExtras}
//           columns={columns}
//           pagination={{
//             page: meta?.page || 1,
//             totalPages: meta?.totalPage || 1,
//             onPageChange: setPage,
//           }}
//         />
//       )}
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LoadingSpinner from "@/lib/loading-spinner";
import {
  useDeleteJobMutation,
  useGetAllJobswithStaticsQuery,
} from "@/redux/features/jobsApi";
import { Column } from "@/types/types";
import { Calendar, Trash2, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { StatsCard } from "../shared/stats-card";
import { Button } from "../ui/button";
import AdminTable from "./table";
import Swal from "sweetalert2";

interface JobRow {
  serial: number;
  title: string;
  category: string;
  type: string;
  jobLocation: string;
  applicationsCount: number;
  salaryRange: string;
  action?: React.ReactNode;
}

export default function Jobs() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllJobswithStaticsQuery({ page, limit });
  const [deleteJob] = useDeleteJobMutation();

  const meta = data?.meta;
  const jobs = useMemo(() => data?.data || [], [data?.data]);

  // ✅ Delete Function with SweetAlert2
  const handleDelete = async (jobId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This job will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteJob(jobId).unwrap();
        console.log(res);
        Swal.fire(
          "Deleted!",
          "The job has been deleted successfully.",
          "success"
        );
      } catch {
        Swal.fire("Error!", "Failed to delete the job.", "error");
      }
    }
  };

  // Add serial + salary formatting
  const jobsWithExtras: JobRow[] = useMemo(
    () =>
      jobs.map((job: any, index: number) => ({
        serial: (page - 1) * limit + index + 1,
        title: job.title,
        category: job.category,
        type: job.type,
        jobLocation: job.jobLocation,
        applicationsCount: job.applicationsCount,
        salaryRange: `£${job.minSalary} - £${job.maxSalary}`,
        action: (
          <Button
            variant={"ghost"}
            onClick={() => handleDelete(job._id)}
            className="flex items-center gap-2 rounded-full text-red-600 bg-red-400/10 hover:bg-red-600/90 hover:text-white duration-300"
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        ),
      })),
    [jobs, page, limit]
  );

  const columns: Column<JobRow>[] = useMemo(
    () => [
      { key: "serial", label: "Serial No." },
      { key: "title", label: "Job Title" },
      { key: "category", label: "Category" },
      { key: "type", label: "Type" },
      { key: "jobLocation", label: "Location" },
      { key: "applicationsCount", label: "Applications" },
      { key: "salaryRange", label: "Salary Range" },
      { key: "action", label: "Action" },
    ],
    []
  );

  const stats = useMemo(
    () => [
      {
        title: "Total Job Posted",
        value: meta?.total?.toLocaleString() || "0",
        change: "+8.5%",
        changeText: "Up from yesterday",
        icon: Calendar,
      },
      {
        title: "Active Jobs",
        value: jobs.length.toLocaleString(),
        change: "+8.5%",
        changeText: "Up from yesterday",
        icon: Users,
      },
      {
        title: "Applications",
        value: meta?.totalApplications?.toLocaleString() || "0",
        change: "+8.5%",
        changeText: "Up from yesterday",
        icon: Calendar,
      },
    ],
    [jobs.length, meta]
  );

  return (
    <div>
      <StatsCard stats={stats} />

      {isLoading ? (
        <LoadingSpinner />
      ) : jobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">No jobs are available</p>
        </div>
      ) : (
        <AdminTable<JobRow>
          data={jobsWithExtras}
          columns={columns}
          pagination={{
            page: meta?.page || 1,
            totalPages: meta?.totalPage || 1,
            onPageChange: setPage,
          }}
        />
      )}
    </div>
  );
}
