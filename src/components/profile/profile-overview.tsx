"use client";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "@/lib/loading-spinner";
import { getImageUrl } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/features/userApi";
import { Education, Profile, WorkExperience } from "@/types/profileTypes";
import {
  Building,
  Calendar,
  CircleUserRound,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";

export function ProfileOverview() {
  // RTK Query call with proper typing
  const { data: userData, isLoading } = useGetMeQuery("");
  const profileData: Profile | undefined = userData?.profile;

  console.log("Profile Data:", userData);

  // Loading or no data fallback
  if (isLoading || !profileData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 ">
        <h1 className="text-2xl font-bold text-gray-900 ">
          What recruiters will see
        </h1>

        <div className="w-full max-w-xs">
          <div className="flex justify-between mb-1">
            <span className="text-gray-700 font-medium">
              Complete your profile
            </span>
            <span className="font-semibold">
              {userData?.profileCompletion ?? 0}%
            </span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-3 bg-green-800 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${userData?.profileCompletion ?? 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-3 md:p-8 space-y-5">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
            <div className="flex gap-6">
              {/* profile image  */}
              <div className="w-20 h-20 rounded-full overflow-hidden md:mx-auto shadow-lg ">
                {userData?.image ? (
                  <Image
                    width={1000}
                    height={1000}
                    src={getImageUrl(userData?.image)}
                    alt={userData?.name ?? "User"}
                    className="w-full h-full object-cover "
                  />
                ) : (
                  <CircleUserRound className="size-20  object-cover" />
                )}
              </div>

              {/* Profile Name */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {userData?.name && userData?.name
                      ? `${userData?.name}`
                      : profileData?.name || "Unknown User"}
                  </h2>
                  <p className="text-sm  font-medium">
                    {profileData?.yearsOfExperience || "1"} years of exp
                  </p>

                  {profileData?.openToWork ? (
                    <Badge
                      variant="outline"
                      className="bg-green-900 border-green-100 !py-0 text-white"
                    >
                      Open to work
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-gray-200 border-gray-200 !py-0 text-gray-700"
                    >
                      Not available
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="!text-right text-sm text-gray-900 font-medium">
              <p className="flex gap-2 items-center justify-start md:justify-end">
                {" "}
                <MapPin className="size-4" />
                {`${profileData?.city || "Ruislip"}, ${
                  profileData?.country || "England"
                }` || "England"}
              </p>
              <p className="flex gap-2 items-center justify-start md:justify-end">
                <Mail className="size-4" />{" "}
                {userData?.email || "goroqit@gmail.com"}
              </p>
              <p className="flex gap-2 items-center justify-start md:justify-end">
                <Phone className="size-4" />{" "}
                {profileData?.mobile || "+447362342247"}
              </p>
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
                        {exp?.employmentType && (
                          <span>• {exp.employmentType}</span>
                        )}
                        {exp.startDate && exp.endDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(
                              exp.startDate
                            ).toLocaleDateString()} -{" "}
                            {new Date(exp.endDate).toLocaleDateString()}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Education
            </h3>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Expartes
            </h3>

            {profileData?.expartes?.map((expert) => (
              <Badge
                variant={"outline"}
                key={expert}
                className="mx-0.5 text-md"
              >
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
          <div className="">
            {profileData?.languages?.length > 0 && (
              <div className="">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.languages.map(
                    (language: string, index: number) => (
                      <span key={index} className="font-medium capitalize">
                        {language.trim()}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Personal Information Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Gender:</span>
                <span className="ml-2 text-gray-600">{profileData.gender}</span>
              </div>

              {userData?.dateOfBirth && (
                <div>
                  <span className="font-medium text-gray-700">
                    Date of Birth:
                  </span>
                  <span className="ml-2 text-gray-600">
                    {new Date(userData?.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>
              )}
              {userData?.email && (
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-600">{userData.email}</span>
                </div>
              )}
              {userData?.streetAddress && (
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="ml-2 text-gray-600">
                    {userData.streetAddress}
                  </span>
                </div>
              )}
              {userData?.openToWork !== undefined && (
                <div>
                  <span className="font-medium text-gray-700">
                    Open to Work:
                  </span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      userData.openToWork
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {userData.openToWork ? "Yes" : "No"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Resume Section (if available) */}
          <div className="">
            {profileData?.resume && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Resume
                </h3>
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
        </CardContent>
      </Card>
    </div>
  );
}
