"use client";

import TalentCards from "@/components/shared/talent-cards";
import ErrorMessage from "@/lib/error-message";
import LoadingSpinner from "@/lib/loading-spinner";
import { useGetFilteredTalentsQuery } from "@/redux/features/talentApi";
import { ApiParams, TalentProps } from "@/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { TalentFilterData, TalentSidebar } from "./talent-sidebar";

export default function FilterSection() {
  const [filters, setFilters] = useState<TalentFilterData>({
    search: "",
    location: "",
    gender: "all",
    skills: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const apiFilters = useMemo(() => {
    const apiParams: ApiParams = {
      page: currentPage,
      limit: 8,
    };

    if (filters.search) apiParams.searchTerm = filters.search;
    if (filters.location) apiParams.location = filters.location;
    if (filters.gender && filters.gender !== "all") {
      apiParams.gender = filters.gender;
    }
    if (filters.skills) apiParams.skills = filters.skills;

    return apiParams;
  }, [filters, currentPage]);

  const {
    data: talentsResponse,
    isLoading,
    error,
  } = useGetFilteredTalentsQuery({
    ...apiFilters,
    skills: Array.isArray(apiFilters.skills)
      ? apiFilters.skills.join(",")
      : apiFilters.skills,
  });

  // Extract talents and pagination data from response
  const { talents, pagination } = useMemo(() => {
    if (!talentsResponse) {
      return { talents: [], pagination: null };
    }

    return {
      talents: talentsResponse.data || [],
      pagination: talentsResponse.meta || null,
    };
  }, [talentsResponse]);

  // Transform API data to match TalentCards expected format
  const transformedTalents = useMemo(() => {
    return talents.map((talent: TalentProps) => ({
      id: talent._id,
      name:
        `${talent.firstName || ""} ${talent.lastName || ""}`.trim() ||
        talent.userId?.name ||
        "Unknown",
      title: talent.workExperience?.[0]?.jobTitle || "Not specified",
      experience:
        talent.workExperience?.[0]?.experience || "Experience not specified",
      expartes: Array.isArray(talent.expartes)
        ? talent.expartes
        : Array.isArray(talent.expartes)
        ? talent.expartes
        : [],
      skills: Array.isArray(talent.skills)
        ? talent.skills
        : Array.isArray(talent.expartes)
        ? talent.expartes
        : [],
      price: talent.salaryExpectation || "Not specified",
      image: talent.userId?.image || null,
      bio: talent.bio,
      education: talent.education?.[0]?.degreeTitle,
      country: talent.country,
      city: talent.city,
      workExperience: Array.isArray(talent.workExperience)
        ? talent.workExperience
        : [],
      userId: talent.userId,
    }));
  }, [talents]);

  // console.log(transformedTalents, "transformed talents");

  const handleFiltersChange = useCallback((newFilters: TalentFilterData) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Generate page numbers for pagination
  const renderPageNumbers = () => {
    if (!pagination || pagination.totalPage <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(
      pagination.totalPage,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-1 rounded-full border text-gray-600 hover:bg-gray-100 disabled:opacity-50 ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-green-700 hover:bg-gray-100 border border-gray-300"
        }`}
      >
        <ChevronLeft />
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-full ${
            currentPage === i
              ? "bg-green-600 text-white font-semibold border border-green-600"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pagination.totalPage}
        className={`p-1 rounded-full border text-gray-600 hover:bg-gray-100 disabled:opacity-50 ${
          currentPage === pagination.totalPage
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-green-700 hover:bg-gray-100 border border-gray-300"
        }`}
      >
        <ChevronRight />
      </button>
    );

    return pages;
  };

  if (error) {
    return <ErrorMessage title="talents" />;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <TalentSidebar onFiltersChange={handleFiltersChange} />
        </div>

        <div className="col-span-1 md:col-span-2">
          {/* Talents grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {isLoading ? (
              <LoadingSpinner />
            ) : transformedTalents && transformedTalents.length > 0 ? (
              transformedTalents.map((talent: TalentProps) => (
                <TalentCards key={talent._id} talent={talent} />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <div className="text-gray-500 text-lg mb-2">
                  No talents found matching your criteria
                </div>
                <p className="text-gray-400">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPage > 1 && (
            <div className="flex justify-end items-center space-x-2 mt-8">
              {renderPageNumbers()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
