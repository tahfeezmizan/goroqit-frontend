"use client";

import image from "@/assets/why-roqit-img.png";
import { Gauge, MapPin, Package, User } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Package,
    title: "Made for Beauty & Creative Props",
    description: "Not another corporate job board.",
  },
  {
    icon: Gauge,
    title: "Fast & Affordable",
    description: "Job posts go live instantly.",
  },
  {
    icon: MapPin,
    title: "Local & Relevant",
    description: "See real roles in your area.",
  },
  {
    icon: User,
    title: "Social-Style Profiles",
    description: "Showcase skills, reviews, and photos.",
  },
];

export function WhyRoqitSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
      <div className="flex flex-col md:flex-row gap-10 items-center justify-between overflow-hidden">
        <div className="flex-1 space-y-8 ">
          <h2 className=" text-4xl  font-bold text-black leading-tight mb-10">
            Why GoRoqit?
          </h2>

          <div className="space-y-8 ">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 ">
                <div className="flex-shrink-0 w-12 h-12 bg-green-900 rounded-full flex items-center justify-center ">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 ">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 ">
          <Image
            src={image}
            width={632}
            height={556}
            className="w-full lg:w-[632px] h-full lg:h-[556px] mr-0"
            alt="why roqit"
          />
        </div>
      </div>
    </section>
  );
}
