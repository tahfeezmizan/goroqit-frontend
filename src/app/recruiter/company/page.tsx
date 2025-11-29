import CompanyProfile from "@/components/recruiter/company-profile";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="space-y-6 pt-3 md:pt-0">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          About Company{" "}
        </h2>
        <div className="">
          <Link
            href={"/recruiter/company/edit-company"}
            className="bg-green-900 hover:bg-green-800 text-white px-2 md:px-8 py-2 text-lg font-medium rounded-lg"
          >
            Edit Company
          </Link>
        </div>
      </div>

      <CompanyProfile />
    </div>
  );
}
