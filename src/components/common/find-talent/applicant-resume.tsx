"use client";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/lib/loading-spinner";
import { formatWorkDuration, getImageUrl } from "@/lib/utils";
import {
  Education,
  Profile,
  UserData,
  WorkExperience,
} from "@/types/profileTypes";

import { Building, Calendar, MapPin } from "lucide-react";

// Type definitions based on your data structure

export function ApplicantResume({ data }: { data: UserData | undefined }) {
  const profileData: Profile | undefined = data?.profile;

  //   Loading or no data fallback
  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
        <div className="flex gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {data?.name && data?.name
                  ? `${data?.name}`
                  : profileData?.name || "Unknown User"}
              </h2>
              <p className="text-sm  font-medium">2 years of exp</p>

              <Badge
                variant={"outline"}
                className="bg-green-200 border-green-200"
              >
                {data?.status === "active" ? "Open to work" : "Deactive"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="text-right text-sm text-gray-600">
          <p>{`${profileData?.city}, ${profileData?.country}`}</p>
          <p>{data?.email}</p>
          <p>{profileData?.mobile}</p>
        </div>
      </div>

      <div className="">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Personal Overview
        </h3>
        <p className="text-base text-gray-700 leading-relaxed">
          {profileData?.bio}
        </p>
      </div>

      {/* Work Experience Section */}
      <div className="">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Work Experience
        </h3>
        <div className="space-y-6">
          {profileData?.workExperience?.map(
            (exp: WorkExperience, index: number) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-gray-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {exp?.jobTitle || "Position Title"}
                  </h4>
                  <p className=" text-gray-600 font-medium">
                    {exp?.companyName || "Company Name"}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1 mb-2">
                    {exp?.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {exp?.location}
                      </span>
                    )}
                    {exp?.employmentType && <span>• {exp.employmentType}</span>}
                    {exp.startDate && exp.endDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {/* {new Date(exp.startDate).toLocaleDateString()} -{" "}
                        {new Date(exp.endDate).toLocaleDateString()} */}
                        {formatWorkDuration(exp.startDate, exp.endDate)}
                      </span>
                    )}
                    {exp.experience && <span>• {exp.experience}</span>}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Education</h3>
        <div className="space-y-4">
          {profileData?.education.map((edu: Education, index: number) => (
            <div key={index} className="border-l-2 border-gray-200 pl-4">
              <h4 className="font-semibold text-gray-900">
                {edu.degreeTitle || "Degree"}
                {edu.major && ` in ${edu.major}`}
              </h4>
              <p className="text-gray-600 font-medium">
                {edu.instituteName || "Institution"}
              </p>
              <div className="flex gap-4 text-sm text-gray-500 mt-1">
                {edu.yearOfPassing && (
                  <span>Graduated: {edu.yearOfPassing}</span>
                )}
                {edu.duration && <span>• Duration: {edu.duration}</span>}
                {edu.cgpa && edu.scale && (
                  <span>
                    • CGPA: {edu.cgpa}/{edu.scale}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* skills Section */}
      <div className="">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Expartes</h3>

        {profileData?.expartes?.map((expert) => (
          <Badge variant={"outline"} key={expert} className="mx-0.5 text-md">
            {expert}
          </Badge>
        ))}
      </div>

      {/* skills Section */}
      <div className="">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>

        {profileData?.skills?.map((skill) => (
          <Badge variant={"outline"} key={skill} className="mx-0.5 text-md">
            {skill}
          </Badge>
        ))}
      </div>

      {/* skills Section */}
      {profileData?.languages && profileData.languages.length > 0 && (
        <div className="">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Languages
          </h3>
          {profileData?.languages
            ?.map(
              (lang: string) =>
                lang.trim().charAt(0).toUpperCase() + lang.trim().slice(1)
            )
            .join(", ") || "No languages listed"}
        </div>
      )}

      {/* Resume Section (if available) */}
      {profileData?.resume && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume</h3>
          <div className="flex items-center gap-2">
            <a
              href={getImageUrl(profileData?.resume)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
            >
              View Resume
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
