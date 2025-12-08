import Image from "next/image";
import React from "react";
import resumeSample from "@/assets/resume.jpg";
import applicantImage from "@/assets/discover-section-img (1).png";
import { Button } from "../ui/button";
import { Mail, MessageCircle } from "lucide-react";

export default function ApplicantResume() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1 space-y-5">
        <h2 className="text-3xl font-medium leading-loose">
          Applicant Profile
        </h2>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative w-20 h-20">
              <Image
                src={applicantImage}
                width={98}
                height={98}
                alt="Jerome Bell"
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Jerome Bell</h2>
              <p className="text-gray-600">Web-Designer</p>
            </div>
          </div>

          {/* Personal Info */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Personal Info
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Full Name</p>
                  <p className="text-gray-900 font-medium">Jerome Bell</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Gender</p>
                  <p className="text-gray-900 font-medium">Male</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                  <p className="text-gray-900 font-medium">
                    March 23, 1995{" "}
                    <span className="text-gray-500">(26 y.o)</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Language</p>
                  <p className="text-gray-900 font-medium">
                    English, French, Bahasa
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Address</p>
                <p className="text-gray-900 font-medium">
                  4517 Washington Ave,
                  <br />
                  Manchester, Kentucky 39495
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center space-x-2 bg-transparent hover:text-white hover:bg-green-900 duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </Button>
            <Button className="flex-1 flex items-center justify-center space-x-2 bg-transparent text-black border hover:text-white hover:bg-green-900 duration-300">
              <MessageCircle className="w-4 h-4" />
              <span>Message</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="col-span-2  space-y-5">
        <h2 className="text-3xl font-medium leading-loose">Resume</h2>

        <Image
          src={resumeSample}
          width={960}
          height={400}
          alt="Applicant Resume "
          className="max-w-full max-h-full rounded-lg  "
        />
      </div>
    </div>
  );
}
