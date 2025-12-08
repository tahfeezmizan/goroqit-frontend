"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { EducationForm } from "./education-form";
import { PersonalDetailsForm } from "./personal-details-form";
import { ProfileOthersForm } from "./profile-others-form";
import { ProfileOverview } from "./profile-overview";
import ProfileSection from "./profile-section";
import { ResumeUpload } from "./resume-upload";
import { WorkExperienceForm } from "./work-experience-form";
import PortfolioForm from "./portfolio-form";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  const handleTabChange = (value: string) => {
    router.push(`/profile?tab=${value}`);
  };

  return (
    <div className="bg-[#EBF1FA]">
      <div className="p-1 md:p-4 overflow-hidden">
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="w-full flex items-start justify-start bg-white mb-8 overflow-x-scroll md:overflow-x-auto gap-6">
            {/* Removed the unnecessary flex container that was limiting the width */}
            <TabsTrigger value="profile" className="cursor-pointer">
              Over View
            </TabsTrigger>
            <TabsTrigger value="personal-details" className="cursor-pointer">
              Personal Details
            </TabsTrigger>
            <TabsTrigger value="resume" className="cursor-pointer">
              Resume / CV
            </TabsTrigger>
            <TabsTrigger value="education" className="cursor-pointer">
              Education
            </TabsTrigger>
            <TabsTrigger value="work-experience" className="cursor-pointer">
              Work Experience
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="cursor-pointer">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="others" className="cursor-pointer">
              Others
            </TabsTrigger>
          </TabsList>

          {/* Tab content remains the same */}
          <TabsContent
            value="profile"
            className="bg-white rounded-lg p-8 shadow-none border-none"
          >
            <ProfileOverview />
          </TabsContent>
          <TabsContent
            value="personal-details"
            className="bg-white rounded-lg p-8 shadow-none border-none space-y-6"
          >
            <ProfileSection />
            <PersonalDetailsForm />
          </TabsContent>

          <TabsContent
            value="resume"
            className="bg-white rounded-lg p-8 shadow-none border-none"
          >
            <ResumeUpload />
          </TabsContent>

          <TabsContent
            value="education"
            className="bg-white rounded-lg p-8 shadow-none border-none"
          >
            <EducationForm />
          </TabsContent>

          <TabsContent
            value="work-experience"
            className="bg-white rounded-lg p-8 shadow-none border-none"
          >
            <WorkExperienceForm />
          </TabsContent>
          <TabsContent
            value="portfolio"
            className="bg-white rounded-lg p-8 shadow-none border-none"
          >
            <PortfolioForm />
          </TabsContent>
          <TabsContent
            value="others"
            className="bg-white rounded-lg p-8 shadow-none border-none"
          >
            <ProfileOthersForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
