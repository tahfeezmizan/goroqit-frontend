"use client";

import { useState } from "react";
import { StatsCard } from "@/components/shared/stats-card";
import FeaturePurchaseChart from "@/components/admin/feature-purchase-chart";
import RevenueChart from "@/components/admin/revenue-chart";
import { Briefcase, DollarSign, Users } from "lucide-react";
import { useGetStatisticsQuery } from "@/redux/features/adminStatics";
import LoadingSpinner from "@/lib/loading-spinner";

export default function DashboardPage() {
  const [year, setYear] = useState(new Date().getFullYear());

  // Pass year as a parameter to fetch stats
  const { data, isLoading } = useGetStatisticsQuery({ year });

  const stats = [
    {
      title: "Total Job Post",
      value: data?.data?.jobs?.totalJobs.toLocaleString() || "0",
      icon: Briefcase,
    },
    {
      title: "Total Applicant",
      value: data?.data?.users?.totalApplicants.toLocaleString() || "0",
      icon: Users,
    },
    {
      title: "Money Spend",
      value: `£${
        data?.data?.subscriptions?.totalRevenue.toLocaleString() || "0"
      }`,
      icon: DollarSign,
    },
  ];

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p>Here is your job listings statistic report for {year}.</p>
      </div>

      <StatsCard stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <div className="col-span-2">
          <RevenueChart
            monthlyRevenue={data?.data?.monthlyRevenue || []}
            onYearChange={(newYear) => setYear(newYear)}
          />
        </div>
        <div className="col-span-1">
          <FeaturePurchaseChart />
        </div>
      </div>
    </div>
  );
}
