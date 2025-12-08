import Image from "next/image";
import React from "react";
import jobHeroImg from "../../../../public/job-hero.png";

export default function JobsHero() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-4 overflow-hidden">
      <div className="flex items-center justify-center">
        <Image src={jobHeroImg} alt="" width={780} height={500} className="" />
      </div>
    </div>
  );
}
