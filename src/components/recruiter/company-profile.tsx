"use client";

import { getImageUrl } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/features/userApi";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  CircleUserRound,
} from "lucide-react";
import LoadingSpinner from "@/lib/loading-spinner";

export default function CompanyProfile() {
  const { data, isLoading } = useGetMeQuery(undefined);
  const profileData = data?.profile;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-8">
      {/* Company Logo */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div className="w-26 h-26 border p-2 rounded flex items-center justify-center">
          {profileData?.companyLogo ? (
            <Image
              src={getImageUrl(profileData?.companyLogo)}
              alt={profileData?.companyName}
              width={80}
              height={80}
              className="w-full h-full"
            />
          ) : (
            <CircleUserRound className="size-36" />
          )}
        </div>

        <div className="w-full md:max-w-xs">
          <div className="flex justify-between mb-1">
            <span className="text-gray-700 font-medium">
              Complete your profile
            </span>
            <span className="font-semibold">
              {data?.profileCompletion ?? 0}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-3 bg-green-800 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${data?.profileCompletion ?? 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Company Name */}
      <div className="mb-8 space-y-1">
        <h3 className="text-base">Company Name</h3>
        <p className="text-xl font-semibold">{profileData?.companyName}</p>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="block text-xl font-semibold text-gray-900 mb-3">
          Description
        </h3>
        <p className="text-black/65">
          {profileData?.companyDescription || "Description not update"}
        </p>
      </div>

      {/* <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex-1 mb-4">
          <h3 className="block text-xl font-semibold text-gray-900 mb-3">
            Contact Information
          </h3>

          <div className="space-y-2">
            <p className="flex items-center gap-2 text-black/65">
              <Mail className="w-5 h-5 text-gray-500" />
              {profileData?.companyEmail || "Email not available"}
            </p>

            <p className="flex items-center gap-2 text-black/65">
              <Phone className="w-5 h-5 text-gray-500" />
              {profileData?.phone || "Phone not available"}
            </p>

            <p className="flex items-center gap-2 text-black/65">
              <MapPin className="w-5 h-5 text-gray-500" />
              {profileData?.location || "Location not available"}
            </p>

            <p className="flex items-center gap-2 text-black/65">
              <Globe className="w-5 h-5 text-gray-500" />
              {profileData?.companyWebsite || "Website not available"}
            </p>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="block text-xl font-semibold text-gray-900 mb-3">
            Company Social Media  
          </h3>

          <div className="space-y-2">
            <p className="flex items-center gap-2 text-black/65">
              <Linkedin className="w-5 h-5 text-gray-500" />
              {profileData?.linkedinProfile || "LinkedIn not available"}
            </p>

            <p className="flex items-center gap-2 text-black/65">
              <Twitter className="w-5 h-5 text-gray-500" />
              {profileData?.twitterProfile || "Twitter not available"}
            </p>

            <p className="flex items-center gap-2 text-black/65">
              <Facebook className="w-5 h-5 text-gray-500" />
              {profileData?.facebookProfile || "Facebook not available"}
            </p>

            <p className="flex items-center gap-2 text-black/65">
              <Instagram className="w-5 h-5 text-gray-500" />
              {profileData?.instagramProfile || "Instagram not available"}
            </p>
          </div>
        </div>
      </div> */}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex-1 mb-4">
          <h3 className="block text-xl font-semibold text-gray-900 mb-3">
            Contact Information
          </h3>

          <div className="space-y-2">
            {profileData?.companyEmail ? (
              <a
                href={`mailto:${profileData?.companyEmail || ""}`}
                className="flex items-center gap-2 text-black/65 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-500" />
                {profileData?.companyEmail || "Email not available"}
              </a>
            ) : (
              ""
            )}

            {profileData?.phone ? (
              <a
                href={`tel:${profileData?.phone || ""}`}
                className="flex items-center gap-2 text-black/65 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-5 h-5 text-gray-500" />
                {profileData?.phone || "Phone not available"}
              </a>
            ) : (
              ""
            )}

            {profileData?.location ? (
              <a
                href={`https://maps.google.com/?q=${
                  profileData?.location || ""
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black/65 hover:text-blue-600 transition-colors"
              >
                <MapPin className="w-5 h-5 text-gray-500" />
                {profileData?.location || "Location not available"}
              </a>
            ) : (
              ""
            )}

            {profileData?.companyWebsite ? (
              <a
                href={
                  profileData?.companyWebsite
                    ? `https://${profileData.companyWebsite.replace(
                        /^https?:\/\//,
                        ""
                      )}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black/65 hover:text-blue-600 transition-colors"
              >
                <Globe className="w-5 h-5 text-gray-500" />
                {profileData?.companyWebsite || "Website not available"}
              </a>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="block text-xl font-semibold text-gray-900 mb-3">
            Company Social Media
          </h3>

          <div className="space-y-2">
            {profileData?.linkedinProfile ? (
              <a
                href={
                  profileData?.linkedinProfile
                    ? `https://${profileData.linkedinProfile.replace(
                        /^https?:\/\//,
                        ""
                      )}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black/65 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-500" />
                {profileData?.linkedinProfile || "LinkedIn not available"}
              </a>
            ) : (
              " "
            )}

            {profileData?.twitterProfile ? (
              <a
                href={
                  profileData?.twitterProfile
                    ? `https://${profileData.twitterProfile.replace(
                        /^https?:\/\//,
                        ""
                      )}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black/65 hover:text-blue-600 transition-colors"
              >
                <Twitter className="w-5 h-5 text-gray-500" />
                {profileData?.twitterProfile || "Twitter not available"}
              </a>
            ) : (
              ""
            )}

            {profileData?.facebookProfile ? (
              <a
                href={
                  profileData?.facebookProfile
                    ? `https://${profileData.facebookProfile.replace(
                        /^https?:\/\//,
                        ""
                      )}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black/65 hover:text-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5 text-gray-500" />
                {profileData?.facebookProfile || "Facebook not available"}
              </a>
            ) : (
              ""
            )}

            {profileData?.instagramProfile ? (
              <a
                href={
                  profileData?.instagramProfile
                    ? `https://${profileData.instagramProfile.replace(
                        /^https?:\/\//,
                        ""
                      )}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black/65 hover:text-blue-600 transition-colors"
              >
                <Instagram className="w-5 h-5 text-gray-500" />
                {profileData?.instagramProfile || "Instagram not available"}
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
