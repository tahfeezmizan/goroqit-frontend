"use client";

import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/lib/loading-spinner";
import {
  useDeleteSingleUserMutation,
  useGetAllUserQuery,
} from "@/redux/features/userApi";
import { ApiUser, Column } from "@/types/types";
import { Calendar, Trash2, Users } from "lucide-react";
import React, { useMemo, useState } from "react";
import { StatsCard } from "../shared/stats-card";
import AdminTable from "./table";
import Swal from "sweetalert2";

type UserRow = {
  serial: number;
  name: string;
  email: string;
  role: string;
  status: string;
  companyName: string | null;
  createdAt: string;
  action?: React.ReactNode;
};

const columns: Column<UserRow>[] = [
  { key: "serial", label: "Serial No." },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "companyName", label: "Company" },
  { key: "createdAt", label: "Joined At" },
  { key: "action", label: "Action" },
];

export default function Company() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllUserQuery({
    page,
    limit,
    role: "recruiter",
  });

  const [deleteSingleUser] = useDeleteSingleUserMutation();

  const handleDelete = async (userId: string) => {
    console.log(userId);
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
        console.log(res);
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch {
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  const users: UserRow[] = useMemo(() => {
    if (!data?.data?.users) return [];
    return data.data.users.map((user: ApiUser, index: number) => ({
      serial: (page - 1) * limit + index + 1,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      companyName: user?.companyName || null,
      createdAt: new Date(user.createdAt).toLocaleDateString(),
      action: (
        <Button
          variant={"ghost"}
          onClick={() => handleDelete(user._id)}
          className="flex items-center gap-2 rounded-full text-red-600 bg-red-400/10 hover:bg-red-600/90 hover:text-white duration-300"
        >
          <Trash2 className="size-4" />
          Delete
        </Button>
      ),
    }));
  }, [data, page]);

  const stats = useMemo(
    () => [
      {
        title: "Total Users",
        value: data?.data?.staticData?.totalUsers?.toLocaleString() || "0",
        icon: Calendar,
      },
      {
        title: "Job Seekers",
        value: data?.data?.staticData?.totalApplicants?.toLocaleString() || "0",
        icon: Users,
      },
      {
        title: "Total Recruiters",
        value: data?.data?.staticData?.totalRecruiters?.toLocaleString() || "0",
        icon: Calendar,
      },
    ],
    [data]
  );

  return (
    <div>
      <StatsCard stats={stats} />

      {isLoading ? (
        <LoadingSpinner />
      ) : users.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">No recruiters are signed up</p>
        </div>
      ) : (
        <AdminTable
          data={users}
          columns={columns}
          pagination={{
            page: data?.data?.meta?.page || 1,
            totalPages: data?.data?.meta?.totalPage || 1,
            onPageChange: setPage,
          }}
        />
      )}
    </div>
  );
}
