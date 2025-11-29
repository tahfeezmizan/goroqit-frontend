"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/lib/loading-spinner";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/userApi";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface SalaryExpectation {
  amount: number | null;
  type: string | null;
}

interface EssentialPersonalData {
  skills: string[];
  expartes: string[];
  bio: string;
  preferredWorkType?: string;
  salaryExpectation?: SalaryExpectation;
  languages?: string[];
  previousEmployment?: string;
}

export function ProfileOthersForm() {
  const [skillInput, setSkillInput] = useState("");
  const [expertiseInput, setExpertiseInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [salaryType, setSalaryType] = useState("");

  // Get user data
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch,
  } = useGetMeQuery("");

  const profileData = userData?.profile;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EssentialPersonalData>({
    defaultValues: {
      skills: [],
      expartes: [],
      preferredWorkType: "",
      languages: [],
      salaryExpectation: {
        amount: null,
        type: null,
      },
      previousEmployment: "",
    },
  });

  const skills = watch("skills");
  const expartes = watch("expartes");
  const salaryExpectation = watch("salaryExpectation");

  // ✅ Set form values when user data is loaded (Bio fix included)
  useEffect(() => {
    if (profileData) {
      console.log("Loading profile data:", profileData);

      // Handle salaryExpectation data
      let salaryData: SalaryExpectation = { amount: null, type: null };
      if (profileData?.salaryExpectation) {
        if (
          typeof profileData.salaryExpectation === "object" &&
          profileData.salaryExpectation !== null
        ) {
          // If it's already an object with amount and type
          salaryData = {
            amount: profileData.salaryExpectation.amount || null,
            type: profileData.salaryExpectation.type || null,
          };
          setSalaryType(profileData.salaryExpectation.type || "");
        } else {
          // If it's a string or number (legacy format), set only amount
          salaryData = {
            amount: Number(profileData.salaryExpectation) || null,
            type: null,
          };
        }
      }

      reset({
        salaryExpectation: salaryData,
        preferredWorkType: profileData?.preferredWorkType || "",
        skills: profileData.skills || [],
        expartes: profileData.expartes || [],
        bio: profileData.bio || "",
        previousEmployment: profileData?.previousEmployment || "",
      });

      // ✅ if API provides languages, load them too
      if (profileData.languages) {
        setLanguages(profileData.languages);
      }
    }
  }, [profileData, reset]);

  const [updateProfile, { isLoading, isError, error }] =
    useUpdateProfileMutation();

  // === Skill functions ===
  const addSkill = () => {
    if (skillInput.trim()) {
      const existingSkills = profileData?.skills || [];
      const currentSkills = skills || [];
      const mergedSkills = [...new Set([...existingSkills, ...currentSkills])];
      const skillExists = mergedSkills.some(
        (skill) => skill.toLowerCase() === skillInput.trim().toLowerCase()
      );
      if (!skillExists) {
        const updatedSkills = [...mergedSkills, skillInput.trim()];
        setValue("skills", updatedSkills, { shouldValidate: true });
        setSkillInput("");
      } else {
        toast.error("This skill already exists");
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = skills || [];
    const updatedSkills = currentSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setValue("skills", updatedSkills, { shouldValidate: true });
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  // === Expertise functions ===
  const addExpertise = () => {
    if (expertiseInput.trim()) {
      const existingExpertise = profileData?.expartes || [];
      const currentExpertise = expartes || [];
      const mergedExpertise = [
        ...new Set([...existingExpertise, ...currentExpertise]),
      ];
      const expertiseExists = mergedExpertise.some(
        (exp) => exp.toLowerCase() === expertiseInput.trim().toLowerCase()
      );
      if (!expertiseExists) {
        const updatedExpertise = [...mergedExpertise, expertiseInput.trim()];
        setValue("expartes", updatedExpertise, { shouldValidate: true });
        setExpertiseInput("");
      } else {
        toast.error("This expertise already exists");
      }
    }
  };

  const removeExpertise = (expertiseToRemove: string) => {
    const currentExpertise = expartes || [];
    const updatedExpertise = currentExpertise.filter(
      (expertise) => expertise !== expertiseToRemove
    );
    setValue("expartes", updatedExpertise, { shouldValidate: true });
  };

  const handleExpertiseKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addExpertise();
    }
  };

  // === Language functions ===
  const addLanguage = () => {
    if (languageInput.trim()) {
      const exists = languages.some(
        (lang) => lang.toLowerCase() === languageInput.trim().toLowerCase()
      );
      if (!exists) {
        setLanguages((prev) => [...prev, languageInput.trim()]);
        setLanguageInput("");
      } else {
        toast.error("This language already exists");
      }
    }
  };

  const removeLanguage = (langToRemove: string) => {
    setLanguages((prev) => prev.filter((lang) => lang !== langToRemove));
  };

  const handleLanguageKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLanguage();
    }
  };

  // Handle salary amount change
  const handleSalaryAmountChange = (value: string) => {
    const amount = value ? parseInt(value) : null;
    setValue("salaryExpectation", {
      ...(salaryExpectation ?? { amount: null, type: null }),
      amount: amount,
    });
  };

  // Handle salary type change
  const handleSalaryTypeChange = (value: string) => {
    setSalaryType(value);
    setValue("salaryExpectation", {
      ...(salaryExpectation ?? { amount: null, type: null }),
      type: value,
    });
  };

  // const onSubmit = async (data: EssentialPersonalData) => {
  //   console.log("Others Form Data:", data);
  //   const oldSkills = profileData?.profile?.skills || [];
  //   const oldExpertise = profileData?.profile?.expartes || [];
  //   const mergedSkills = [...new Set([...oldSkills, ...(data.skills || [])])];
  //   const mergedExpertise = [
  //     ...new Set([...oldExpertise, ...(data.expartes || [])]),
  //   ];

  //   const finalData = {
  //     ...data,
  //     preferredWorkType: data.preferredWorkType,
  //     salaryExpectation: data.salaryExpectation || { amount: null, type: null },
  //     skills: mergedSkills,
  //     expartes: mergedExpertise,
  //     languages,
  //   };

  //   const formData = new FormData();
  //   formData.append("data", JSON.stringify(finalData));

  //   try {
  //     const res = await updateProfile({ body: formData });
  //     console.log("Api", res);
  //     if (res?.data?.success) {
  //       toast.success("Profile updated successfully");
  //       refetch();
  //     } else {
  //       toast.error(res?.data?.message || "Failed to update profile");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Error updating profile");
  //   }
  // };

  const onSubmit = async (data: EssentialPersonalData) => {
    console.log("Others Form Data:", data);
    const oldSkills = profileData?.profile?.skills || [];
    const oldExpertise = profileData?.profile?.expartes || [];
    const mergedSkills = [...new Set([...oldSkills, ...(data.skills || [])])];
    const mergedExpertise = [
      ...new Set([...oldExpertise, ...(data.expartes || [])]),
    ];

    const finalData = {
      ...data,
      preferredWorkType: data.preferredWorkType,
      salaryExpectation: {
        amount: data.salaryExpectation?.amount || null,
        type: data.salaryExpectation?.type || "hourly", // Ensure type is never null
      },
      skills: mergedSkills,
      expartes: mergedExpertise,
      languages,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(finalData));

    try {
      const res = await updateProfile({ body: formData });
      console.log("Api", res);
      if (res?.data?.success) {
        toast.success("Profile updated successfully");
        refetch();
      } else {
        toast.error(res?.data?.message || "Failed to update profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile");
    }
  };
  
  if (isUserLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      {/* <div className="flex flex-col lg:flex-row gap-6 mt-4"> */}
      <div className="salaryExpectatiosn grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div className="">
          <Label
            htmlFor="salaryExpectation"
            className="text-lg font-medium text-gray-900"
          >
            Salary Expectations
          </Label>
          <div className="flex items-center">
            <Input
              type="number"
              id="salaryExpectation"
              placeholder="Enter salary expectations"
              value={salaryExpectation?.amount || ""}
              onChange={(e) => handleSalaryAmountChange(e.target.value)}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (parseInt(target.value) < 0) target.value = "0";
              }}
              className="mt-1 p-4 rounded-l-sm !text-lg text-black w-full bg-gray-50"
            />
            <Select value={salaryType} onValueChange={handleSalaryTypeChange}>
              <SelectTrigger className="w-[180px] mt-1 p-4 rounded-r-sm !text-lg text-black bg-gray-50">
                <SelectValue placeholder="Hourly" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem defaultChecked value="hourly">
                    Hourly
                  </SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-3">
          <Label className="text-lg font-medium text-gray-90">
            Preferred Work Type
          </Label>
          <div className="flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-8">
            <Controller
              name="preferredWorkType"
              control={control}
              rules={{ required: "Preferred work type is required" }}
              render={({ field }) => {
                return (
                  <>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="Full-time"
                        checked={field.value === "Full-time"}
                        onCheckedChange={(checked) => {
                          if (checked) field.onChange("Full-time");
                        }}
                      />
                      <Label
                        htmlFor="Full-time"
                        className="text-md font-medium text-gray-600"
                      >
                        Full-time
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="Part-time"
                        checked={field.value === "Part-time"}
                        onCheckedChange={(checked) => {
                          if (checked) field.onChange("Part-time");
                        }}
                      />
                      <Label
                        htmlFor="Part-time"
                        className="text-md font-medium text-gray-600"
                      >
                        Part-time
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="Temp"
                        checked={field.value === "Temp"}
                        onCheckedChange={(checked) => {
                          if (checked) field.onChange("Temp");
                        }}
                      />
                      <Label
                        htmlFor="Temp"
                        className="text-md font-medium text-gray-600"
                      >
                        Temp
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="Self-employed"
                        checked={field.value === "Self-employed"}
                        onCheckedChange={(checked) => {
                          if (checked) field.onChange("Self-employed");
                        }}
                      />
                      <Label
                        htmlFor="Self-employed"
                        className="text-md font-medium text-gray-600"
                      >
                        Self-employed
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="Chair-rental"
                        checked={field.value === "Chair-rental"}
                        onCheckedChange={(checked) => {
                          if (checked) field.onChange("Chair-rental");
                        }}
                      />
                      <Label
                        htmlFor="Chair-rental"
                        className="text-md font-medium text-gray-600"
                      >
                        Chair-rental
                      </Label>
                    </div>
                  </>
                );
              }}
            />
          </div>
          {errors.preferredWorkType && (
            <p className="text-red-500 text-sm">
              {errors.preferredWorkType.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-lg font-medium text-gray-90">
          Previous Employment Type
        </Label>
        <div className="flex items-center gap-8">
          <Controller
            name="previousEmployment"
            control={control}
            rules={{ required: "Employment type is required" }}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex items-center space-x-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="Yes" />
                  <Label
                    htmlFor="Yes"
                    className="text-md font-medium text-gray-600"
                  >
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="No" />
                  <Label
                    htmlFor="No"
                    className="text-md font-medium text-gray-600"
                  >
                    No
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
        {errors.preferredWorkType && (
          <p className="text-red-500 text-sm">
            {errors.preferredWorkType.message}
          </p>
        )}
      </div>

      {/* === Bio === */}
      <div>
        <Label htmlFor="bio" className="text-lg font-medium text-gray-900">
          Bio
        </Label>
        <Textarea
          id="bio"
          placeholder="Describe yourself"
          {...register("bio", { required: "Bio is required" })}
          className="mt-1 p-4 rounded-lg !text-lg text-black w-full min-h-[120px] resize-none bg-gray-50"
        />
        {errors.bio && (
          <p className="text-red-500 text-sm">{errors.bio.message}</p>
        )}
      </div>

      {/* === Skills === */}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleSkillKeyPress}
            placeholder="Add a skill (e.g.  barbers, stylists, and beauticians)"
            className="p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
          />
          <Button
            type="button"
            onClick={addSkill}
            className="bg-green-900 hover:bg-green-800 text-white px-6"
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm capitalize"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No skills added yet</p>
          )}
        </div>
      </div>

      {/* === Expertise === */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Expertise</h3>
        <div className="flex gap-2">
          <Input
            value={expertiseInput}
            onChange={(e) => setExpertiseInput(e.target.value)}
            onKeyPress={handleExpertiseKeyPress}
            placeholder="Add an expertise (e.g. Barbers stylists)"
            className="p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
          />
          <Button
            type="button"
            onClick={addExpertise}
            className="bg-green-900 hover:bg-green-800 text-white px-6"
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {expartes && expartes.length > 0 ? (
            expartes.map((expertise, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize"
              >
                <span>{expertise}</span>
                <button
                  type="button"
                  onClick={() => removeExpertise(expertise)}
                  className="hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No expertise added yet</p>
          )}
        </div>
      </div>

      {/* ✅ New Language Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Languages</h3>
        <div className="flex gap-2">
          <Input
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            onKeyPress={handleLanguageKeyPress}
            placeholder="Add a language (e.g., English, Spanish)"
            className="p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
          />
          <Button
            type="button"
            onClick={addLanguage}
            className="bg-green-900 hover:bg-green-800 text-white px-6"
          >
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {languages && languages.length > 0 ? (
            languages.map((language, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm capitalize"
              >
                <span>{language}</span>
                <button
                  type="button"
                  onClick={() => removeLanguage(language)}
                  className="hover:text-red-600 capitalize"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No languages added yet</p>
          )}
        </div>
      </div>

      {/* === Save Button === */}
      <div className="pt-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-sm"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
        {isError && (
          <p className="text-red-500 text-sm mt-2">
            Error updating profile: {error?.toString()}
          </p>
        )}
      </div>
    </div>
  );
}
