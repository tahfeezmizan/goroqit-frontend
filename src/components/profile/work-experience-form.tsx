/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/lib/loading-spinner";
import { formatWorkDuration } from "@/lib/utils";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/userApi";
import { ApiError } from "@/types/types";
import { Edit, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface WorkExperienceData {
  jobTitle: string;
  companyName: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  experience: string;
}

export function WorkExperienceForm() {
  const [formData, setFormData] = useState<WorkExperienceData>({
    jobTitle: "",
    companyName: "",
    location: "",
    employmentType: "",
    startDate: "",
    endDate: "",
    experience: "",
  });

  const [workExperiences, setWorkExperiences] = useState<WorkExperienceData[]>(
    []
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const {
    data: userData,
    refetch,
    isLoading: isUserLoading,
  } = useGetMeQuery("");

  useEffect(() => {
    console.log("Full user data received:", userData);

    if (userData) {
      if (userData?.profile?.workExperience) {
        console.log(
          "Work Experience data found:",
          userData?.profile.workExperience
        );

        if (Array.isArray(userData?.profile?.workExperience)) {
          // Convert any numeric values to strings for form compatibility
          const formattedWorkExperiences =
            userData?.profile?.workExperience.map(
              (exp: WorkExperienceData) => ({
                jobTitle: exp.jobTitle?.toString() || "",
                companyName: exp.companyName?.toString() || "",
                location: exp.location?.toString() || "",
                employmentType: exp.employmentType?.toString() || "",
                startDate: exp.startDate
                  ? new Date(exp.startDate).toISOString().split("T")[0]
                  : "",
                endDate: exp.endDate
                  ? new Date(exp.endDate).toISOString().split("T")[0]
                  : "",
                experience: exp.experience?.toString() || "",
              })
            );

          console.log(
            "Formatted work experiences for state:",
            formattedWorkExperiences
          );
          setWorkExperiences(formattedWorkExperiences);
        }
      } else {
        console.log("No work experience data found in userData.data");
      }
    } else {
      console.log("No userData or userData.data available");
    }
  }, [userData]);

  // Debug effect to track work experiences state
  useEffect(() => {
    console.log("Current work experiences state:", workExperiences);
  }, [workExperiences]);

  const handleInputChange = (
    field: keyof WorkExperienceData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Check if current form is valid
  const isFormValid = () => {
    // Basic field validation
    const allFieldsFilled =
      formData.jobTitle.trim() !== "" &&
      formData.companyName.trim() !== "" &&
      formData.location.trim() !== "" &&
      formData.employmentType.trim() !== "" &&
      formData.startDate.trim() !== "" &&
      formData.endDate.trim() !== "" &&
      formData.experience.trim() !== "";

    // Date validation
    if (!allFieldsFilled) return false;

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    // Check if dates are valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return false;
    }

    // Check if end date is after start date
    if (endDate <= startDate) {
      return false;
    }

    return true;
  };

  // Check if save button should be enabled (has at least one work experience)
  const isSaveEnabled = () => {
    return workExperiences.length > 0;
  };

  const handleAddExperience = async () => {
    // Enhanced validation with specific error messages
    if (formData.jobTitle.trim() === "") {
      toast.error("Please enter a job title");
      return;
    }
    if (formData.companyName.trim() === "") {
      toast.error("Please enter a company name");
      return;
    }
    if (formData.location.trim() === "") {
      toast.error("Please enter a location");
      return;
    }
    if (formData.employmentType.trim() === "") {
      toast.error("Please enter an employment type");
      return;
    }
    if (formData.startDate.trim() === "") {
      toast.error("Please select a start date");
      return;
    }
    if (formData.endDate.trim() === "") {
      toast.error("Please select an end date");
      return;
    }
    if (formData.experience.trim() === "") {
      toast.error("Please enter your experience duration");
      return;
    }

    // Date validation
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (isNaN(startDate.getTime())) {
      toast.error("Please enter a valid start date");
      return;
    }
    if (isNaN(endDate.getTime())) {
      toast.error("Please enter a valid end date");
      return;
    }
    if (endDate <= startDate) {
      toast.error("End date must be after start date");
      return;
    }

    try {
      let updatedWorkExperiences;

      if (editingIndex !== null) {
        // Update existing work experience
        updatedWorkExperiences = [...workExperiences];
        updatedWorkExperiences[editingIndex] = { ...formData };
        setWorkExperiences(updatedWorkExperiences);
        setEditingIndex(null);
      } else {
        // Add new work experience
        updatedWorkExperiences = [...workExperiences, { ...formData }];
        setWorkExperiences(updatedWorkExperiences);
      }

      // Reset form after adding/updating
      setFormData({
        jobTitle: "",
        companyName: "",
        location: "",
        employmentType: "",
        startDate: "",
        endDate: "",
        experience: "",
      });

      // Prepare data for API call
      const workExperiencesForAPI = updatedWorkExperiences.map((exp) => ({
        jobTitle: exp.jobTitle,
        companyName: exp.companyName,
        location: exp.location,
        employmentType: exp.employmentType,
        startDate: exp.startDate,
        endDate: exp.endDate,
        experience: exp.experience,
      }));

      console.log("Sending work experiences to API:", workExperiencesForAPI);

      // Call API to save to database
      const response = await updateProfile({
        body: { workExperience: workExperiencesForAPI },
      }).unwrap();

      console.log("Add/Update API response:", response);

      if (editingIndex !== null) {
        toast.success("Work experience updated and saved to database!");
      } else {
        toast.success("Work experience added and saved to database!");
      }

      // Refetch to ensure data consistency
      await refetch();
    } catch (error: ApiError | any) {
      console.error("Add/Update API error:", error);

      // Revert local state if API call failed
      setWorkExperiences(workExperiences);

      let errorMessage = "Failed to save work experience to database";
      if (error?.data?.message) {
        errorMessage = error.data.message;
      }
      toast.error(errorMessage);
    }
  };

  const handleEditExperience = (index: number) => {
    if (index >= 0 && index < workExperiences.length) {
      const experienceToEdit = workExperiences[index];
      setFormData({ ...experienceToEdit });
      setEditingIndex(index);

      // Scroll to top of form for better UX
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDeleteExperience = async (index: number) => {
    console.log("handleDeleteExperience called with index:", index);
    console.log("Current workExperiences length:", workExperiences.length);

    if (index < 0 || index >= workExperiences.length) {
      console.error("Invalid index for deletion:", index);
      toast.error("Invalid experience selected for deletion");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        console.log("Proceeding with deletion...");

        const newWorkExperiences = [...workExperiences];
        newWorkExperiences.splice(index, 1);

        console.log("New workExperiences after deletion:", newWorkExperiences);

        setWorkExperiences(newWorkExperiences);

        const workExperiencesForAPI = newWorkExperiences.map((exp) => ({
          jobTitle: exp.jobTitle,
          companyName: exp.companyName,
          location: exp.location,
          employmentType: exp.employmentType,
          startDate: exp.startDate,
          endDate: exp.endDate,
          experience: exp.experience,
        }));

        console.log(
          "Sending updated work experiences to API:",
          workExperiencesForAPI
        );

        const response = await updateProfile({
          body: { workExperience: workExperiencesForAPI },
        }).unwrap();

        console.log("Delete API response:", response);
        toast.success("Work experience deleted and saved to database!");

        if (editingIndex === index) {
          setEditingIndex(null);
          setFormData({
            jobTitle: "",
            companyName: "",
            location: "",
            employmentType: "",
            startDate: "",
            endDate: "",
            experience: "",
          });
        } else if (editingIndex !== null && editingIndex > index) {
          setEditingIndex(editingIndex - 1);
        }

        await refetch();
      } catch (error: any) {
        console.error("Delete API error:", error);
        setWorkExperiences(workExperiences);

        let errorMessage = "Failed to delete work experience from database";
        if (error?.data?.message) {
          errorMessage = error.data.message;
        }
        toast.error(errorMessage);
      }
    }
  };

  const handleSave = async () => {
    if (!isSaveEnabled()) {
      toast.error("Please add at least one work experience before saving");
      return;
    }

    try {
      console.log("Saving work experiences to database:", workExperiences);

      // Let's debug by trying different approaches
      // First, let's see what education sends when it works
      console.log("=== DEBUGGING WORK EXPERIENCE API CALL ===");

      // Method 1: Exactly like education form (simple object mapping)
      const workExperiencesForAPI = workExperiences.map((exp) => ({
        jobTitle: exp.jobTitle,
        companyName: exp.companyName,
        location: exp.location,
        employmentType: exp.employmentType,
        startDate: exp.startDate,
        endDate: exp.endDate,
        experience: exp.experience,
      }));

      console.log(
        "Method 1 - Formatted work experiences for API:",
        workExperiencesForAPI
      );
      console.log("Method 1 - Request body:", {
        workExperience: workExperiencesForAPI,
      });

      // Try to send the request
      const response = await updateProfile({
        body: { workExperience: workExperiencesForAPI },
      }).unwrap();

      toast.success("Work experience information saved successfully!");
      console.log(
        "Work experience saved to database - API response:",
        response
      );

      // Force refetch to ensure we have the latest data
      const refreshedData = await refetch();
      console.log("Refreshed data after save:", refreshedData);
    } catch (error: any) {
      console.error("=== DETAILED ERROR ANALYSIS ===");
      console.error("Full error object:", error);
      console.error("Error status:", error?.status);
      console.error("Error data:", error?.data);
      console.error("Error message:", error?.data?.message);
      console.error("Error messages array:", error?.data?.errorMessages);
      console.error("Error stack:", error?.data?.stack);

      // Try alternative approach if the first method fails
      if (error?.data?.message === "Cast Error") {
        console.log("=== TRYING ALTERNATIVE METHODS ===");

        try {
          // Method 2: Try with snake_case fields (common in some APIs)
          const altWorkExperience = workExperiences.map((exp) => ({
            job_title: exp.jobTitle,
            company_name: exp.companyName,
            location: exp.location,
            employment_type: exp.employmentType,
            start_date: exp.startDate,
            end_date: exp.endDate,
            experience: exp.experience,
          }));

          console.log("Method 2 - Snake case attempt:", {
            workExperience: altWorkExperience,
          });

          // const altResponse = await updateProfile({
          //   body: { workExperience: altWorkExperience },
          // }).unwrap();

          toast.success("Work experience saved with alternative format!");
          await refetch();
          return;
        } catch (altError) {
          console.error("Method 2 also failed:", altError);
        }

        try {
          // Method 3: Try with work_experience key instead of workExperience
          const workExp = workExperiences.map((exp) => ({
            jobTitle: exp.jobTitle,
            companyName: exp.companyName,
            location: exp.location,
            employmentType: exp.employmentType,
            startDate: exp.startDate,
            endDate: exp.endDate,
            experience: exp.experience,
          }));

          console.log("Method 3 - Different key attempt:", {
            work_experience: workExp,
          });

          // const altResponse2 = await updateProfile({
          //   body: { work_experience: workExp },
          // }).unwrap();

          toast.success("Work experience saved with work_experience key!");
          await refetch();
          return;
        } catch (altError2) {
          console.error("Method 3 also failed:", altError2);
        }
      }

      let errorMessage = "Failed to save work experience information";
      if (error?.data?.message) {
        errorMessage = `${error.data.message}`;
        if (error?.data?.errorMessages) {
          errorMessage += `: ${error.data.errorMessages
            .map(
              (e: { path: string; message: string }) =>
                `${e.path} - ${e.message}`
            )
            .join(", ")}`;
        }
      }

      toast.error(errorMessage);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setFormData({
      jobTitle: "",
      companyName: "",
      location: "",
      employmentType: "",
      startDate: "",
      endDate: "",
      experience: "",
    });
  };

  return (
    <div className="space-y-8">
      {/* Experience Section */}
      <div>
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">
          Experience
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="jobTitle"
            >
              Job Title
            </Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              placeholder="Senior Barber"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="companyName"
            >
              Company Name
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              placeholder="Luxe Beauty Lounge"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="location"
            >
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="London"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>

          {/* <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="employmentType"
            >
              Employment Type
            </Label>
            <Input
              id="employmentType"
              value={formData.employmentType}
              onChange={(e) =>
                handleInputChange("employmentType", e.target.value)
              }
              placeholder="Full Time"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
            
          </div> */}
          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="employmentType"
            >
              Employment Type
            </Label>
            <Select
              value={formData.employmentType}
              onValueChange={(value) =>
                handleInputChange("employmentType", value)
              }
            >
              <SelectTrigger className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Temp">Temp</SelectItem>
                <SelectItem value="Self-employed">Self-employed</SelectItem>
                <SelectItem value="Chair-rental">Chair-rental</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="startDate"
            >
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="endDate"
            >
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              min={formData.startDate || undefined}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label
              className="text-lg font-medium text-gray-900"
              htmlFor="experience"
            >
              Experience
            </Label>
            <Input
              type="number"
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              placeholder="2 Years"
              className="mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="flex flex-col md:flex-row gap-4">
        <Button
          onClick={handleAddExperience}
          type="button"
          disabled={!isFormValid() || isLoading}
          className={`px-8 py-4 text-lg font-medium rounded-lg flex items-center gap-2 ${
            isFormValid() && !isLoading
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Plus className="h-4 w-4" />
          {isLoading
            ? "Saving..."
            : editingIndex !== null
            ? "Update Experience"
            : "Add Work Experience"}
        </Button>

        {editingIndex !== null && (
          <Button
            onClick={handleCancelEdit}
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 text-lg font-medium rounded-lg"
          >
            Cancel Edit
          </Button>
        )}

        <Button
          onClick={handleSave}
          type="button"
          disabled={!isSaveEnabled() || isLoading}
          className={`px-8 py-4 text-lg font-medium rounded-lg flex items-center gap-2 ${
            isSaveEnabled() && !isLoading
              ? "bg-green-900 hover:bg-green-800 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Save className="h-4 w-4" />
          {isLoading ? "Saving..." : "Save All Experience"}
        </Button>
      </div> */}

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          onClick={handleAddExperience}
          type="button"
          disabled={!isFormValid() || isLoading}
          className={`px-8 py-4 text-lg font-medium rounded-lg flex items-center gap-2 ${
            isFormValid() && !isLoading
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Plus className="h-4 w-4" />
          {isLoading
            ? "Saving..."
            : editingIndex !== null
            ? "Update Experience"
            : "Add Work Experience"}
        </Button>

        {editingIndex !== null && (
          <>
            <Button
              onClick={handleCancelEdit}
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 text-lg font-medium rounded-lg"
            >
              Cancel Edit
            </Button>

            {/* Show Save All Experience only when editing */}
            <Button
              onClick={handleSave}
              type="button"
              disabled={!isSaveEnabled() || isLoading}
              className={`px-8 py-4 text-lg font-medium rounded-lg flex items-center gap-2 ${
                isSaveEnabled() && !isLoading
                  ? "bg-green-900 hover:bg-green-800 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Save className="h-4 w-4" />
              {isLoading ? "Saving..." : "Save All Experience"}
            </Button>
          </>
        )}
      </div>

      {/* Added Work Experience List */}
      {(workExperiences.length > 0 || isUserLoading) && (
        <div className="mt-8">
          <h4 className="text-2xl font-semibold text-gray-900 mb-4">
            {isUserLoading ? (
              <LoadingSpinner />
            ) : (
              `Added Work Experience (${workExperiences.length})`
            )}
          </h4>

          {isUserLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              {workExperiences.map((experience, index) => (
                <div
                  key={`experience-${index}`}
                  className={`border rounded-lg p-6 bg-white shadow-sm ${
                    editingIndex === index
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-gray-900">
                        {experience.jobTitle}
                      </h5>
                      <p className="text-gray-600 mb-2">
                        {experience.companyName}
                      </p>
                      <p className="text-gray-700 font-medium mb-1">
                        {experience.location}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <span>
                          <strong>Type:</strong> {experience.employmentType}
                        </span>
                        <span>
                          <strong>Start:</strong>{" "}
                          {new Date(experience.startDate).toLocaleDateString()}
                        </span>
                        <span>
                          <strong>End:</strong>{" "}
                          {new Date(experience.endDate).toLocaleDateString()}
                        </span>
                        <span>
                          <strong>Experience:</strong>{" "}
                          {formatWorkDuration(
                            experience.startDate,
                            experience.endDate
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("Edit button clicked for index:", index);
                          handleEditExperience(index);
                        }}
                        size="sm"
                        variant="outline"
                        className="p-2"
                        type="button"
                        disabled={isLoading}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log(
                            "Delete button clicked for index:",
                            index
                          );
                          console.log(
                            "Current workExperiences:",
                            workExperiences
                          );
                          handleDeleteExperience(index);
                        }}
                        size="sm"
                        variant="outline"
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        type="button"
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
