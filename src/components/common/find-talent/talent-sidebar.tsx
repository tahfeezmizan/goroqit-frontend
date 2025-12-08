"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "lodash";
import { MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export interface TalentFilterData {
  search: string;
  location: string;
  gender: string;
  skills: string;
}

interface TalentSidebarProps {
  onFiltersChange: (filters: TalentFilterData) => void;
}

export function TalentSidebar({ onFiltersChange }: TalentSidebarProps) {
  const [filterData, setFilterData] = useState<TalentFilterData>({
    search: "",
    location: "",
    gender: "all",
    skills: "",
  });

  // Debounced filter change handler
  const debouncedFilterChange = useMemo(
    () =>
      debounce((filters: TalentFilterData) => {
        onFiltersChange(filters);
      }, 500),
    [onFiltersChange]
  );

  // Update debounced filters when filterData changes
  useEffect(() => {
    debouncedFilterChange(filterData);
    return () => {
      debouncedFilterChange.cancel();
    };
  }, [filterData, debouncedFilterChange]);

  const handleInputChange = <K extends keyof TalentFilterData>(
    field: K,
    value: TalentFilterData[K]
  ) => {
    setFilterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearAll = () => {
    const clearedFilters: TalentFilterData = {
      search: "",
      location: "",
      gender: "all",
      skills: "",
    };
    setFilterData(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg space-y-4">
      <div className="flex justify-between items-center text-xl border-b">
        <h2 className="font-semibold text-gray-800 leading-relaxed">Filter</h2>
        <button
          className="text-red-500 text-lg hover:text-red-600 leading-relaxed cursor-pointer"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium text-black">Search</h3>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by name or skills"
            value={filterData.search}
            onChange={(e) => handleInputChange("search", e.target.value)}
            className="pl-4 pr-4 py-2 w-full rounded-lg !text-md text-black border border-gray-300"
          />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium text-black">Location</h3>
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

      <div className="space-y-3">
        <h3 className="text-lg font-medium text-black">Gender</h3>
        <Select
          value={filterData.gender}
          onValueChange={(val) => handleInputChange("gender", val)}
        >
          <SelectTrigger className="mt-1 p-4 rounded-lg !text-md text-black w-full">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}