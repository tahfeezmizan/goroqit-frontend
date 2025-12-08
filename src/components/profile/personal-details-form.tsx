"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/lib/loading-spinner";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/userApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EssentialPersonalData {
  firstName: string;
  lastName: string;
  mobile: string;
  dateOfBirth: string;

  streetAddress: string;
  city: string;
  country: string;
  citizenship?: string;
  yearsOfExperience?: string;
  landLine: string;
  zipCode?: string;

  age?: number;
}

export function PersonalDetailsForm() {
  // Get user data
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch,
  } = useGetMeQuery("");

  const profileData = userData?.profile;

  const { register, handleSubmit, reset } = useForm<EssentialPersonalData>({
    defaultValues: {
      firstName: "",
      lastName: "",

      mobile: "",
      dateOfBirth: "",

      streetAddress: "",
      city: "",
      country: "",
      citizenship: "",
      yearsOfExperience: "",
      landLine: "",
      zipCode: "",

      age: profileData?.age ? Number(profileData.age) : undefined,
    },
  });

  // ✅ Set form values when user data is loaded (Bio fix included)
  useEffect(() => {
    if (profileData) {
      reset({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        mobile: profileData.mobile || "",
        dateOfBirth: profileData.dateOfBirth
          ? new Date(profileData.dateOfBirth).toISOString().split("T")[0]
          : "",

        streetAddress: profileData.streetAddress || "",
        city: profileData.city || "",
        country: profileData.country || "",
        citizenship: profileData.citizenship || "",
        yearsOfExperience: profileData.yearsOfExperience || "",
        landLine: profileData.landLine || "",
        zipCode: profileData.zipCode || "",

        age: Number(profileData.age) || undefined,
      });
    }
  }, [profileData, reset]);

  const [updateProfile, { isLoading, isError, error }] =
    useUpdateProfileMutation();

  // const onSubmit = async (data: EssentialPersonalData) => {
  //   console.log("Personal Details Form Data:", data);

  //   const finalData = {
  //     ...data,
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
    const finalData = {
      ...data,
      age: data.age ? Number(data.age) : undefined, // Convert age to number
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(finalData));

    try {
      const res = await updateProfile({ body: formData });
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
      {/* === Personal Information Section === */}
      <h3 className="text-3xl font-semibold text-gray-900 mb-2">
        Personal Information
      </h3>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div>
            <Label
              htmlFor="firstName"
              className="text-lg font-medium text-gray-900"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              {...register("firstName")}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            />
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className="text-lg font-medium text-gray-900"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              {...register("lastName")}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* <div>
            <Label
              htmlFor="gender"
              className="text-lg font-medium text-gray-900"
            >
              Gender
            </Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label
              htmlFor="maritalStatus"
              className="text-lg font-medium text-gray-900"
            >
              Marital Status
            </Label>
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50">
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div> */}
          <div>
            <Label
              htmlFor="citizenship"
              className="text-lg font-medium text-gray-900"
            >
              Nationality
            </Label>
            <Input
              id="citizenship"
              placeholder="citizenship"
              {...register("citizenship")}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            />
          </div>
          <div>
            <Label
              htmlFor="dateOfBirth"
              className="text-lg font-medium text-gray-900"
            >
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth")}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="">
            <Label htmlFor="age" className="text-lg font-medium text-gray-900">
              Age
            </Label>
            <Input
              type="number"
              id="age"
              placeholder="Enter age"
              {...register("age")}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            />
          </div>
          <div className="">
            <Label
              htmlFor="yearsOfExperience"
              className="text-lg font-medium text-gray-900"
            >
              Years of experience
            </Label>
            <Input
              type="number"
              id="yearsOfExperience"
              placeholder="Enter years of experience"
              {...register("yearsOfExperience")}
              minLength={11}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* === Address === */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="streetAddress"
                className="text-lg font-medium text-gray-900"
              >
                Street Address
              </Label>
              <Input
                id="streetAddress"
                placeholder="123 Main Street"
                {...register("streetAddress")}
                className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
              />
            </div>
            <div>
              <Label
                htmlFor="city"
                className="text-lg font-medium text-gray-900"
              >
                City
              </Label>
              <Input
                id="city"
                placeholder="General Trias"
                {...register("city")}
                className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="zipCode"
                className="text-lg font-medium text-gray-900"
              >
                Zip/Postal Code
              </Label>
              <Input
                type="text"
                id="zipCode"
                placeholder="Zip/Postal Code"
                {...register("zipCode")}
                className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
              />
            </div>
            <div>
              <Label
                htmlFor="country"
                className="text-lg font-medium text-gray-900"
              >
                Country
              </Label>
              <Input
                id="country"
                placeholder="Philippines"
                {...register("country")}
                className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <Label
              htmlFor="mobile"
              className="text-lg font-medium text-gray-900"
            >
              Mobile Number
            </Label>
            <Input
              id="mobile"
              placeholder="Mobile Number"
              {...register("mobile")}
              minLength={11}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            />
          </div>
          <div className="">
            <Label
              htmlFor="landLine"
              className="text-lg font-medium text-gray-900"
            >
              Landline Number
            </Label>
            <Input
              type="number"
              id="landLine"
              placeholder="landLine Number"
              {...register("landLine")}
              minLength={11}
              className="mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-50"
            />
          </div>
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
