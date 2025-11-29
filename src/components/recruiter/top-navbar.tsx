"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getImageUrl, getTokenAndRole } from "@/lib/utils";
import { useDeleteUserMutation, useGetMeQuery } from "@/redux/features/userApi";
import { removeUser } from "@/redux/slice/userSlice";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { PageLoading } from "../shared/page-loading";

export function TopNavbar() {
  const { data, isLoading } = useGetMeQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const { role } = getTokenAndRole();
  console.log(role);

  if (isLoading) {
    return <PageLoading />;
  }

  const handleLogout = () => {
    dispatch(removeUser());
    router.push("/");
  };

  const handleDeleteAccount = async () => {
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
        await deleteUser().unwrap();
        Swal.fire("Deleted!", "Your account has been deleted.", "success");
        dispatch(removeUser());
        router.push("/");
      } catch {
        Swal.fire("Error!", "Failed to delete account.", "error");
      }
    }
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 z-30">
      <div className="flex items-center justify-between h-full px-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 capitalize pl-8 lg:pl-0">
          {data?.role} Panel
        </h1>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 h-auto"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2">
                {data?.profile?.companyLogo || data?.image ? (
                  <Image
                    width={1000}
                    height={1000}
                    src={getImageUrl(data?.profile?.companyLogo || data?.image)}
                    alt={data?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CircleUserRound className="size-11" />
                )}
              </div>

              <div className="md:flex flex-col text-start hidden ">
                <span className="!text-lg font-semibold text-gray-900 leading-none">
                  {data?.name}
                </span>
                <span className="font-semibold text-gray-900">
                  {data?.role}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 ">
            <DropdownMenuItem className="flex flex-col items-start">
              <span className="text-xl font-semibold">{data?.name}</span>
              <span className="text-sm text-gray-500">{data?.email}</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              Logout
            </DropdownMenuItem>
            {role !== "admin" && (
              <DropdownMenuItem
                className="text-red-600"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
