"use client";

import CreateChatModal from "@/components/profile/createChatModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getImageUrl } from "@/lib/utils";
import { useGetSingleTalentQuery } from "@/redux/features/talentApi";
import { CircleUserRound, Mail } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import ApplicantPortfolio from "./applicant-portfolio";
import { ApplicantResume } from "./applicant-resume";

export default function ApplicantProfile() {
  const { id }: { id: string } = useParams();
  const { data: talent } = useGetSingleTalentQuery(id);

  return (
    <section className=" px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6 ">
          {/* Left Column - Profile Card */}
          <div className="col-auto md:col-span-1 bg-white p-6 rounded-lg overflow-hidden">
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto shadow-lg ">
                  {talent?.image ? (
                    <Image
                      width={1000}
                      height={1000}
                      src={getImageUrl(talent?.image)}
                      alt={talent?.name ?? "User"}
                      className="w-32 h-32 object-cover "
                    />
                  ) : (
                    <CircleUserRound className="h-32 w-32 object-cover" />
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {talent?.name}
              </h3>
              <p className="text-gray-600 font-medium">
                {talent?.profile?.expartes &&
                talent?.profile?.expartes?.length > 0
                  ? talent?.profile?.expartes?.join(", ")
                  : "No expartes listed"}
              </p>
              <div className="mt-4">
                {talent?.profile?.openToWork === true ? (
                  <span className="bg-green-900 text-white text-lg font-semibold px-4 py-1.5 rounded-full">
                    Open to work
                  </span>
                ) : (
                  "NOt Avaible"
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Contact
              </h4>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() =>
                    (window.location.href = `mailto:${talent?.email}`)
                  }
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Button>

                <CreateChatModal myId={id} />
              </div>
            </div>

            {/* Bio */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Bio</h4>
              <p className="text-gray-700 leading-relaxed text-justify text-sm">
                {talent?.profile?.bio}
              </p>
            </div>

            {/* Salary Expectations */}
            {talent?.profile?.salaryExpectation ? (
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Salary Expectations
                </h4>

                <p className="text-lg text-gray-900">
                  <span>£</span>
                  {talent?.profile?.salaryExpectation &&
                  talent?.profile?.salaryExpectation?.length > 0
                    ? talent?.profile?.salaryExpectation
                    : "No skills listed"}
                  <span>/hr</span>
                </p>
              </div>
            ) : (
              ""
            )}

            {/* Skills */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Skills
              </h4>
              <ul className="space-y-2">
                {talent?.profile?.skills && talent?.profile?.skills?.length > 0
                  ? talent?.profile?.skills?.map((skill: string) => (
                      <Badge variant={"outline"} key={skill} className="mx-0.5">
                        {skill}
                      </Badge>
                    ))
                  : "No Expectations"}
              </ul>
            </div>

            <div className="mb-4">
              {/* Languages */}
              {talent?.profile?.languages?.length > 0 ? (
                <div className="">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Languages
                  </h4>
                  <ul className="space-y-2">
                    {talent.profile.languages
                      .map(
                        (lang: string) =>
                          lang.trim().charAt(0).toUpperCase() +
                          lang.trim().slice(1)
                      )
                      .join(", ") || "No languages listed"}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Right Column - Resume/CV */}
          <div className="col-span-2 space-y-6 bg-white p-8 rounded-lg overflow-hidden">
            <Tabs defaultValue="portfolio">
              <TabsList className="mb-6">
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
              </TabsList>
              <TabsContent value="portfolio">
                <ApplicantPortfolio data={talent} key={talent?._id} />
              </TabsContent>
              <TabsContent value="resume">
                <ApplicantResume data={talent} key={talent?._id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
