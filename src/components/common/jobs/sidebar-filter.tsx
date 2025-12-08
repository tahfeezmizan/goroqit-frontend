"use client";

import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Search } from "lucide-react";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import { debounce } from "lodash";
import { Category } from "@/types/types";

export interface FilterData {
  search: string;
  location: string;
  category: string;
  jobType: {
    fullTime: boolean;
    partTime: boolean;
    contract: boolean;
    remote: boolean;
    freeLance: boolean;
  };
  salaryRange: [number, number];
}

interface SidebarFilterProps {
  onFiltersChange: (filters: FilterData) => void;
}

export function SidebarFilter({ onFiltersChange }: SidebarFilterProps) {
  const { data: categories } = useGetCategoryQuery({});
  const categoryNames =
    categories?.data?.data?.map((category: Category) => category.name) || [];

  const [filterData, setFilterData] = useState<FilterData>({
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

  // ✅ FIXED: useMemo instead of useCallback to avoid dependency warning
  const debouncedFilterChange = useMemo(
    () =>
      debounce((filters: FilterData) => {
        onFiltersChange(filters);
      }, 500),
    [onFiltersChange]
  );

  useEffect(() => {
    debouncedFilterChange(filterData);
    return () => {
      debouncedFilterChange.cancel();
    };
  }, [filterData, debouncedFilterChange]);

  const handleInputChange = <K extends keyof FilterData>(
    field: K,
    value: FilterData[K]
  ) => {
    setFilterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleJobTypeChange = (
    jobTypeField: keyof FilterData["jobType"],
    value: boolean
  ) => {
    setFilterData((prev) => ({
      ...prev,
      jobType: {
        ...prev.jobType,
        [jobTypeField]: value,
      },
    }));
  };

  // Prevent negative numbers in salary inputs
  const handleSalaryInputChange = (value: string, index: number) => {
    let num = Number(value);
    if (isNaN(num)) return;

    // 🔒 Ensure value can't go below 0
    if (num < 0) num = 0;

    const newRange = [...filterData.salaryRange] as [number, number];
    newRange[index] = num;

    // Only update if valid range
    if (newRange[0] <= newRange[1]) {
      setFilterData((prev) => ({
        ...prev,
        salaryRange: newRange,
      }));
    }
  };

  const handleClearAll = () => {
    const clearedFilters: FilterData = {
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
    };
    setFilterData(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg space-y-4">
      <div className="flex justify-between items-center text-xl border-b">
        <h2 className="font-semibold text-gray-800 leading-relaxed">Filter</h2>
        <button
          className="text-lg text-red-500 hover:text-red-600 leading-relaxed cursor-pointer"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>

      {/* Search & Location */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-black">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Job title or keyword"
            value={filterData.search}
            onChange={(e) => handleInputChange("search", e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg !text-md text-black"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Location"
            value={filterData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg !text-md text-black"
          />
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      {/* Category */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-black">Category</h3>
        <Select
          value={filterData.category}
          onValueChange={(val) => handleInputChange("category", val)}
        >
          <SelectTrigger className="mt-1 p-4 rounded-lg !text-md text-black w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-categories">All Categories</SelectItem>
            {categoryNames.map((categoryName: string, index: number) => (
              <SelectItem key={index} value={categoryName}>
                {categoryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <hr className="border-t border-gray-200" />

      {/* Job Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-black">Job Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="full-time"
              checked={filterData.jobType.fullTime}
              onCheckedChange={(val) => handleJobTypeChange("fullTime", !!val)}
            />
            <Label
              htmlFor="full-time"
              className="text-md font-medium leading-none"
            >
              Full time
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="part-time"
              checked={filterData.jobType.partTime}
              onCheckedChange={(val) => handleJobTypeChange("partTime", !!val)}
            />
            <Label
              htmlFor="part-time"
              className="text-md font-medium leading-none"
            >
              Part time
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contract"
              checked={filterData.jobType.contract}
              onCheckedChange={(val) => handleJobTypeChange("contract", !!val)}
            />
            <Label
              htmlFor="contract"
              className="text-md font-medium leading-none"
            >
              Contract
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remote"
              checked={filterData.jobType.remote}
              onCheckedChange={(val) => handleJobTypeChange("remote", !!val)}
            />
            <Label
              htmlFor="remote"
              className="text-md font-medium leading-none"
            >
              Remote
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="freeLance"
              checked={filterData.jobType.freeLance}
              onCheckedChange={(val) => handleJobTypeChange("freeLance", !!val)}
            />
            <Label
              htmlFor="freeLance"
              className="text-md font-medium leading-none"
            >
              Freelance
            </Label>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      {/* Salary Range */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-black">Salary Range</h3>
        <Slider
          value={filterData.salaryRange}
          onValueChange={(val) =>
            handleInputChange("salaryRange", val as [number, number])
          }
          step={100}
          min={0}
          max={200000}
          className="w-full"
        />
        <div className="flex space-x-4">
          <Input
            type="number"
            value={filterData.salaryRange[0]}
            onChange={(e) => handleSalaryInputChange(e.target.value, 0)}
            className="w-1/2"
          />
          <Input
            type="number"
            value={filterData.salaryRange[1]}
            onChange={(e) => handleSalaryInputChange(e.target.value, 1)}
            className="w-1/2"
          />
        </div>
      </div>
    </div>
  );
}
