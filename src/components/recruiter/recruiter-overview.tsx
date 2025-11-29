"use client";

import { Briefcase, DollarSign, Users } from "lucide-react";
import { StatsCard } from "../shared/stats-card";
import { ApplicationChart } from "./application-chart";
import { useGetRecruiterStatisticsQuery } from "@/redux/features/recruterStaticsApi";
import LoadingSpinner from "@/lib/loading-spinner";
import { useGetMeQuery } from "@/redux/features/userApi";

export default function RecruiterOverview() {
  const { data, isLoading, error } = useGetRecruiterStatisticsQuery();
  const { data: userData } = useGetMeQuery("");

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500">Failed to load recruiter statistics</p>;
  }

  const recruiterStats = data?.data;

  const stats = [
    {
      title: "Total Job Post",
      value: recruiterStats?.totalJobs.toString() ?? "0",
      change: "+0%", // you can calculate % change later if API supports
      changeText: "Compared to last week",
      icon: Briefcase,
    },
    {
      title: "Total Applicant",
      value: recruiterStats?.totalApplications.toString() ?? "0",
      change: "+0%",
      changeText: "Compared to last week",
      icon: Users,
    },
    {
      title: "Total Chats",
      value: recruiterStats?.totalChats.toString() ?? "0",
      change: "+0%",
      changeText: "Compared to last week",
      icon: DollarSign, // you could swap this for a chat icon if you prefer
    },
  ];

  console.log("RECRUITER STATS", userData);

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-semibold">
          Welcome back, {userData?.name}
        </h2>
        <p>Here is your job listings dynamic report.</p>
      </div>

      <StatsCard stats={stats} />

      <ApplicationChart />
    </div>
  );
}
