/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/lib/loading-spinner";
import {
  useDeleteSingleUserMutation,
  useGetAllUserQuery,
} from "@/redux/features/userApi";
import { Column, StatItem, UserData } from "@/types/types";
import { Calendar, Trash2, Users } from "lucide-react";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { StatsCard } from "../shared/stats-card";
import AdminTable from "./table";

const columns: Column<UserData>[] = [
  { key: "_id", label: "Serial Id" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "companyName", label: "Company" },
  { key: "createdAt", label: "Joined At" },
  { key: "action", label: "Action" },
];

export default function User() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllUserQuery({ page, limit });
  const [deleteSingleUser] = useDeleteSingleUserMutation();

  const users = data?.data?.users || [];
  const meta = data?.data?.meta;
  const staticData = data?.data?.staticData;

  // console.log(users);

  const handleDelete = async (userId: string) => {
    // console.log(userId);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteSingleUser(userId).unwrap();
        // console.log(res);
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch {
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  // Generate stats dynamically
  const stats: StatItem[] = useMemo(() => {
    return [
      {
        title: "Total Users",
        value: staticData?.totalUsers?.toLocaleString() || "0",
        icon: Calendar,
      },
      {
        title: "Job Seekers",
        value: staticData?.totalApplicants?.toLocaleString() || "0",
        icon: Users,
      },
      {
        title: "Total Recruiters",
        value: staticData?.totalRecruiters?.toLocaleString() || "0",
        icon: Calendar,
      },
    ];
  }, [staticData]);

  const usersWithSerial = users.map((user: UserData, index: number) => ({
    ...user,
    _id: (page - 1) * limit + index + 1,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
    action: (
      <>
        {user?.role !== "admin" && (
          <Button
            variant={"ghost"}
            onClick={() => handleDelete(user._id)}
            className="flex items-center gap-2 rounded-full text-red-600 bg-red-400/10 hover:bg-red-600/90 hover:text-white duration-300"
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        )}
      </>
    ),
  }));

  return (
    <div>
      <StatsCard stats={stats} />

      {isLoading ? (
        <LoadingSpinner />
      ) : users.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">No users are registered</p>
        </div>
      ) : (
        <AdminTable
          data={usersWithSerial}
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
