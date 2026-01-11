import { PostJobFormData } from "@/types/types";
import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import ApplicantPortfolio from "../find-talent/applicant-portfolio";

export default function JobDetail({ data }: { data: PostJobFormData }) {
  const compnayData = data?.user?.profile;
  console.log("compnayData", compnayData);

  const content: string = data.description || "";

  return (
    <aside className="w-full  bg-white p-8 rounded-lg">
      <div className="space-y-6">
        {/* Company Profile */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900">{data?.title}</h2>
          <div className="text-gray-600 leading-relaxed">
            <span className="font-medium">{compnayData?.companyName}</span>{" "}
            <span className=" flex items-center gap-0.5 ">
              {" "}
              <MapPin size={16} /> {data?.jobLocation}
            </span>
          </div>
        </section>

        <section>
          <div
            className="prose max-w-none text-black"
            dangerouslySetInnerHTML={{ __html: content ?? "" }}
          />
        </section>

        <hr />
        {/* Description */}

        <section className="space-y-4">
          <div>
            {compnayData?.companyDescription ? (
              <>
                <h2 className="text-xl font-bold text-gray-900">
                  Company Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {compnayData.companyDescription}
                </p>
              </>
            ) : (
              "No Company Description Available"
            )}
          </div>

          <hr />

          {/* Contact Information */}
          <div className="">
            {compnayData &&
            (compnayData.companyEmail ||
              compnayData.phone ||
              compnayData.location ||
              compnayData.companyWebsite ||
              compnayData.linkedinProfile ||
              compnayData.twitterProfile ||
              compnayData.facebookProfile ||
              compnayData.instagramProfile) ? (
              <>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="flex-1 mb-4">
                    <h3 className="block text-xl font-semibold text-gray-900 mb-3">
                      Contact Information
                    </h3>

                    <div className="space-y-2">
                      <a
                        href={`mailto:${compnayData?.companyEmail || ""}`}
                        className="flex items-center gap-2 text-black/65 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="w-5 h-5 text-gray-500" />
                        {compnayData?.companyEmail || "Email not available"}
                      </a>

                      <a
                        href={`tel:${compnayData?.phone || ""}`}
                        className="flex items-center gap-2 text-black/65 hover:text-blue-600 transition-colors"
                      >
                        <Phone className="w-5 h-5 text-gray-500" />
                        {compnayData?.phone || "Phone not available"}
                      </a>

                      <a
                        href={`https://maps.google.com/?q=${
                          compnayData?.location || ""
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-black/65 hover:text-blue-600 transition-colors"
                      >
                        <MapPin className="w-5 h-5 text-gray-500" />
                        {compnayData?.location || "Location not available"}
                      </a>

                      <a
                        href={
                          compnayData?.companyWebsite
                            ? `https://${compnayData.companyWebsite.replace(
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
                        {compnayData?.companyWebsite || "Website not available"}
                      </a>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="block text-xl font-semibold text-gray-900 mb-3">
                      Company Social Media
                    </h3>

                    <div className="space-y-2">
                      <a
                        href={
                          compnayData?.linkedinProfile
                            ? `https://${compnayData.linkedinProfile.replace(
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
                        {compnayData?.linkedinProfile ||
                          "LinkedIn not available"}
                      </a>

                      <a
                        href={
                          compnayData?.twitterProfile
                            ? `https://${compnayData.twitterProfile.replace(
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
                        {compnayData?.twitterProfile || "Twitter not available"}
                      </a>

                      <a
                        href={
                          compnayData?.facebookProfile
                            ? `https://${compnayData.facebookProfile.replace(
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
                        {compnayData?.facebookProfile ||
                          "Facebook not available"}
                      </a>

                      <a
                        href={
                          compnayData?.instagramProfile
                            ? `https://${compnayData.instagramProfile.replace(
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
                        {compnayData?.instagramProfile ||
                          "Instagram not available"}
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              " No Contact Information Available"
            )}
          </div>

          <hr />
          <div className="">
            {compnayData && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Company Portfolio
                </h2>

                <ApplicantPortfolio
                  data={compnayData as any}
                  key={compnayData._id}
                />
              </>
            )}
          </div>
        </section>
      </div>
    </aside>
  );
}
