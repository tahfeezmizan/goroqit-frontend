/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SVGImage from "@/assets/mian-white-logo.png";
import { useGetFilterdJobsQuery } from "@/redux/features/jobsApi";
import { PostJobFormData } from "@/types/types";
import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import JobCard from "./job-card";
import { SidebarFilter, FilterData } from "./sidebar-filter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LoadingSpinner from "@/lib/loading-spinner";
import ErrorMessage from "@/lib/error-message";

export default function JobsSection() {
  const [filters, setFilters] = useState<FilterData>({
    search: "",
    location: "",
    category: "all-categories",
    jobType: {
      fullTime: false,
      partTime: false,
      contract: false,
      remote: false,
      freeLance: false,
    },
    salaryRange: [0, 100000],
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Convert filter data to API parameters
  const apiFilters = useMemo(() => {
    const apiParams: any = {
      page: currentPage,
      limit: 10,
    };

    // ✅ FIXED: Use "searchTerm" to match your API
    if (filters.search) apiParams.searchTerm = filters.search;

    // ✅ Fixed location mapping
    if (filters.location) apiParams.jobLocation = filters.location;

    // ✅ Category filter
    if (filters.category && filters.category !== "all-categories") {
      apiParams.category = filters.category;
    }

    // ✅ Job types
    const selectedJobTypes = Object.entries(filters.jobType)
      .filter(([, value]) => value)
      .map(([key]) => key);

    if (selectedJobTypes.length > 0) {
      const jobTypeMapping: Record<string, string> = {
        fullTime: "Full-time",
        partTime: "Part-time",
        contract: "Contract",
        remote: "Remote",
        freeLance: "Freelance",
      };

      const apiJobTypes = selectedJobTypes.map((type) => jobTypeMapping[type]);
      apiParams.type = apiJobTypes[0];
    }

    // ✅ Salary range
    const [minSalary, maxSalary] = filters.salaryRange;
    if (minSalary > 0) apiParams.minSalary = minSalary;
    if (maxSalary < 100000) apiParams.maxSalary = maxSalary;

    return apiParams;
  }, [filters, currentPage]);

  const {
    data: jobsResponse,
    isLoading,
    error,
  } = useGetFilterdJobsQuery(apiFilters);

  // Extract jobs and pagination data from response
  const { jobs, pagination } = useMemo(() => {
    if (!jobsResponse) {
      return { jobs: [], pagination: null };
    }

    if (Array.isArray(jobsResponse)) {
      return { jobs: jobsResponse, pagination: null };
    }

    const jobsList = Array.isArray(jobsResponse.data)
      ? jobsResponse.data
      : Array.isArray(jobsResponse.data?.data)
      ? jobsResponse.data.data
      : [];

    const metaData = jobsResponse.meta || jobsResponse.data?.meta || null;

    return {
      jobs: jobsList,
      pagination: metaData,
    };
  }, [jobsResponse]);

  const handleFiltersChange = useCallback((newFilters: FilterData) => {
    setFilters((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(newFilters)) {
        setCurrentPage(1);
        return newFilters;
      }
      return prev;
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const totalPages = useMemo(() => {
    return Number(
      pagination?.totalPage ||
        pagination?.totalPages ||
        pagination?.total_page ||
        1
    );
  }, [pagination]);

  // Generate page numbers for pagination
  const renderPageNumbers = () => {
    if (!pagination || totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(
      totalPages,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`p-2 rounded-full border flex items-center justify-center transition-colors ${
          currentPage <= 1
            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
            : "bg-white text-green-800 hover:bg-green-50 border-gray-300 shadow-sm cursor-pointer"
        }`}
        title="Previous Page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          type="button"
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 rounded-full border text-gray-700 bg-white hover:bg-gray-100 border-gray-300 cursor-pointer"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          type="button"
          onClick={() => handlePageChange(i)}
          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            currentPage === i
              ? "bg-green-800 text-white shadow-sm"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          type="button"
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 rounded-full border text-gray-700 bg-white hover:bg-gray-100 border-gray-300 cursor-pointer"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`p-2 rounded-full border flex items-center justify-center transition-colors ${
          currentPage >= totalPages
            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
            : "bg-white text-green-800 hover:bg-green-50 border-gray-300 shadow-sm cursor-pointer"
        }`}
        title="Next Page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    );

    return pages;
  };

  if (error) {
    return <ErrorMessage title="jobs" />;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 overflow-hidden h-full min-h-screen">
      <div className="text-center mb-10 space-y-2 pt-5 lg:pt-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-center">
          Find Your <span className="text-green-900">Styler</span>
        </h2>
        <div className="flex items-center justify-center gap-3">
          <p className="text-[#515B6F] text-base">
            Find your next career at Roqit
          </p>
          <Image src={SVGImage} alt="rocket image" width={42} height={42} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <SidebarFilter onFiltersChange={handleFiltersChange} />
        </div>

        <div className="col-span-1 md:col-span-2">
          {/* Jobs list */}
          <div className="space-y-6 mb-8">
            {isLoading ? (
              <LoadingSpinner />
            ) : jobs && jobs?.length > 0 ? (
              jobs?.map((job: PostJobFormData) => (
                <JobCard job={job} key={job?._id} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">
                  No jobs found matching your criteria
                </div>
                <p className="text-gray-400">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination && totalPages > 1 && (
            <div className="flex justify-end items-center space-x-2 mt-8">
              {renderPageNumbers()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
