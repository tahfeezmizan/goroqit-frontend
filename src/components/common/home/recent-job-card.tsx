"use client";
import TimeAgo from "@/lib/time-ago";
import { getImageUrl } from "@/lib/utils";
import { PostJobFormData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default function RecentJobCard({ job }: { job: PostJobFormData }) {
  const { _id, title, startDate, experianceLabel, user } = job || {};

  const { companyName, companyLogo } = user?.profile || {};

  return (
    <div key={_id} className="rounded-lg overflow-hidden bg-white  p-5">
      <div className="flex justify-between items-start mb-8">
        <Image
          src={getImageUrl(companyLogo)}
          alt={title}
          width={200}
          height={200}
          className="w-24 h-24 border p-2 rounded object-cover"
        />

        <div className="space-y-1">
          {/* experienceLevel */}
          <h3 className="font-bold">{experianceLabel || "Experienced"}</h3>
          {/* daysLeft */}
          <p className="text-gray-500">
            <TimeAgo date={startDate} />
          </p>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold leading-none group-hover:text-white transition-colors duration-400">
              {title}
            </h3>
            <p>{companyName || "No Company"}</p>
          </div>
          <Link
            href={`/job/${_id}`}
            className="bg-green-900 text-white px-2 py-1 text-sm rounded-lg w-28 mr-0 text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
