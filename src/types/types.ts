/* eslint-disable @typescript-eslint/no-explicit-any */

import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";

// types/job.ts
export type JobCardProps = {
  id: number;
  companyLogo: StaticImageData; // or ReactNode if using SVG imports
  experienceLevel: string;
  daysLeft: string;
  companyName: string;
  jobTitle: string;
  salary?: string;
  location?: string;
};

export type WorkExperience = {
  institution?: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: any;
};

export type Education = {
  institution?: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: any;
};

export interface PortfolioData {
  title: string;
  description: string;
  images: File[];
  imageUrls: string[]; // For displaying existing images from server
}

export interface TalentProps {
  // Core display fields
  id: string;
  _id: string;
  userId: {
    _id: string;
    image: string;
    name: string;
  };
  name: string;
  title: string;
  experience: string;
  skills: string[];
  price: string;

  // Additional fields from your data
  email: string;
  openToWork: boolean;
  expartes: string[];
  location?: string;
  preferredWorkType?: string | null;
  bio?: string | null;
  yearsOfExperience: string;

  education: Education[];

  workExperience: WorkExperience[];

  salaryExpectation?: number | null;
  mobile: string;
  verified: boolean;
  status: string;
  role: string;

  // Optional personal info
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  streetAddress: string;
}

export interface AppliedJob {
  _id: string;
  applicant: string;
  author: {
    companyName: string;
  };
  companyName: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  experience: number;
  job: {
    _id: string;
    title: string;
  };
  location: string;
  name: string;
  phone: string;
  resume: string;
  title: string;
}

export type ApplicantJob = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  applicationDate: string; // ISO date string (e.g., "2025-09-14")
  Skills: string[];
  Action: string; // URL or route
};

export type StatItem = {
  title: string;
  value: string;
  icon: LucideIcon;
};

export type UserData = {
  _id: string;
  name: string;
  email: string;
  role: "applicant" | "recruiter" | "admin" | string;
  status: "active" | "restricted" | string;
  companyName?: string | null;
  subscribe?: boolean;
  createdAt: string | Date;
  updatedAt: string;
  profile?: string;
  roleProfile?: string;
  image?: string | null;
  action?: React.ReactNode;
};

export type CompanyData = {
  recruiterId: string;
  recruiterName: string;
  companyName: string;
  jobPosted: number;
  renewalDate: string;
  paymentStatus: string;
};

export interface PostJobFormData {
  _id?: number | string;
  title: string;
  category?: string;
  type: "Full-time" | "Part-time" | "Temp" | "Self-employed" | "Chair-rental";
  startDate: Date;
  endDate: Date;
  engagementType: string;
  minSalary: number;
  maxSalary: number;
  description?: string;
  responsibilities?: string;
  jobLocation: string;
  applicationsCount: string;
  salryType: "yearly" | "monthly" | "weekly" | "hourly";
  experianceLabel: "Junior" | "Mid-Level" | "Senior" | "Master";
  user?: {
    email: string;
    image: string | null;
    name: string;
    profile?: {
      _id: string;
      companyName: string;
      companyLogo: string | null;
      location: string;
      companyEmail: string;
      companyDescription: string;
    } | null;
    role: string;
    roleProfile: string;
  } | null;
}

export type Column<T> = {
  key: keyof T;
  label: string;
};

export type JobData = {
  _id?: string;
  userId: string;
  jobTitle: string;
  companyName: string;
  salary: string;
  jobType: string;
  applications: number;
};

export type JobApplyFormInputs = {
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: number;
  resume: FileList;
};

export interface ApiError {
  status: number;
  data?: {
    message?: string;
    success?: boolean;
    errorMessages?: { message: string }[];
  };
}

export type Category = {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  createdAt: string | Date; // ISO date string
  updatedAt: string | Date; // ISO date string
  __v: number;
};

export type ApiParams = {
  page: number;
  limit: number;
  searchTerm?: string;
  location?: string;
  gender?: string;
  skills?: string | string[];
};

export type ApiUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  companyName?: string;
  createdAt: string;
};
