"use client";

import { useGetPlansQuery } from "@/redux/features/planApi";
import { PricingCard } from "./pricing-card";
import LoadingSpinner from "@/lib/loading-spinner";

export default function PricingPage() {
  const { data, isLoading } = useGetPlansQuery();

  // Extract plans safely
  const planData = data?.plans ?? [];

  return (
    <div className="bg-[#EBF1FA] pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">
            Choose your plan
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto text-pretty">
            Boost your job post to reach more candidates and hire faster.
          </p>
        </div>

        {/* Pricing Cards */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {planData.length > 0 ? (
              <>
                {planData.map((plan) => (
                  <PricingCard
                    key={plan._id}
                    _id={plan._id}
                    title={plan.title}
                    price={plan.price ?? 0}
                    duration={plan.duration}
                    features={plan.features ?? []}
                    paymentLink={plan.paymentLink ?? "/"}
                  />
                ))}
              </>
            ) : (
              <div className="col-span-1 md:col-end-2 lg:col-span-3 text-center">
                {" "}
                No pricing plans are currently public.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
