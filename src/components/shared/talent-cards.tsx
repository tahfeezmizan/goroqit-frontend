import { getImageUrl } from "@/lib/utils";
import { TalentProps } from "@/types/types";
import {
  Briefcase,
  CheckCircle,
  CirclePoundSterling,
  CircleUserRound,
  Scissors,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function TalentCards({ talent }: { talent: TalentProps }) {
  console.log(talent);

  return (
    <div
      key={talent.id}
      className="bg-white rounded-lg overflow-hidden border border-gray-200"
    >
      <Link href={`/find-talent/${talent?.userId?._id}`}>
        <div className="p-4 bg-gray-100 space-y-3 relative">
          <div className="flex items-center justify-center gap-2 bg-white p-1 rounded-md w-40 absolute right-4 shadow">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-xs font-bold text-gray-700">
              Available For work
            </span>
          </div>

          <div className="flex justify-center mt-8">
            <div className="relative w-28 h-28 border rounded-full overflow-hidden">
              {talent?.userId?.image ? (
                <Image
                  src={getImageUrl(talent.userId.image)}
                  alt={talent?.userId?.name || "Talent"}
                  width={1000}
                  height={1000}
                  className="rounded-full object-cover w-full h-full"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <CircleUserRound className="size-45" />
                </div>
              )}
            </div>
          </div>

          <p className="text-base font-medium text-gray-600 text-center leading-relaxed">
            {talent?.expartes && talent?.expartes?.length > 0 ? (
              talent?.expartes?.map((s, i) => (
                <span key={i}>
                  {s}
                  {i < talent?.expartes?.length - 1 && ", "}
                </span>
              ))
            ) : (
              <span>Not Provided</span>
            )}
          </p>
        </div>

        <div className="p-5">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
            {talent?.userId?.name || "Luke Dolan"}
          </h3>

          {/* Details */}
          <div className="space-y-4">
            {/* Experience */}
            <div className="flex items-center gap-4">
              <Briefcase className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
              <span className="text-lg leading-tight text-gray-700">
                {talent?.yearsOfExperience} years experience
              </span>
            </div>

            {/* Skills */}
            <div className="flex items-center gap-4 ">
              <Scissors className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
              <span className=" leading-tight text-gray-700">
                {/* Skills:{" "} */}
                {talent?.skills && talent?.skills?.length > 0 ? (
                  talent?.skills?.map((s, i) => (
                    <Badge variant={"outline"} key={i} className="mx-0.5 mb-1 ">
                      {s}
                      {i < talent?.skills?.length - 1 && ""}
                    </Badge>
                  ))
                ) : (
                  <span>Not Provided</span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-4 ">
              <CirclePoundSterling className="w-8 h-8 bg-white shadow-lg p-1 rounded-full  text-green-900 flex-shrink-0" />
              <span className="text-lg leading-tight text-gray-700">
                {talent?.price ? (
                  <p>
                    {talent.price.amount} /{" "}
                    <span className="capitalize">{talent.price.type}</span>
                  </p>
                ) : talent?.salaryExpectation ? (
                  <p>
                    {talent.salaryExpectation.amount} /{" "}
                    <span className="capitalize">
                      {talent.salaryExpectation.type}
                    </span>
                  </p>
                ) : (
                  <span>15000</span>
                )}
              </span>
            </div>

            {/* Location */}
            {/* <div className="flex items-center gap-4">
              <Globe className="text-green-800" />
              <p className="text-gray-800 font-medium">{location}</p>
            </div> */}

            {/* Experience */}
            {/* <div className="flex flex-col gap-4">
              {safeWorkExperience.length > 0 ? (
                safeWorkExperience.map((exp: WorkExperience, index: number) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-gray-800">
                      <span className="flex gap-2 font-medium">
                        <BriefcaseBusiness className="text-green-800" />
                        {exp?.jobTitle || "Position not specified"}
                      </span>
                      {exp?.companyName && `@ ${exp.companyName}`}
                      {exp?.employmentType && ` (${exp.employmentType})`}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-800 italic">No experience added yet</p>
              )}
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
}
