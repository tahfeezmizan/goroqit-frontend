"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import heroBg from "@/assets/hero-bg.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useGetHomeStatisticsQuery } from "@/redux/features/adminStatics";

export function HeroSection() {
  const {
    data: homeStatistics,
    isLoading,
    error,
  } = useGetHomeStatisticsQuery({});
  console.log("home", homeStatistics?.totalUsers);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${heroBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto text-white text-center px-4 md:px-20 py-16 md:py-20 overflow-hidden space-y-5">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-balance">
          Find Work. Find Talent.{" "}
          <span className="text-[#0F5F3E]">All in One</span> Place.
        </h1>
        <p className="text-lg md:text-2xl px-0 lg:px-40 leading-snug text-gray-200">
          GoRoqit connects salons, barbers, and beauty creatives with fresh
          talent and opportunities. No stress. Just jobs that fit.
        </p>

        <div className=" flex flex-col items-center justify-center sm:flex-row gap-4">
          <Link href={"/find-talent"}>
            <Button
              size="lg"
              className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-lg"
            >
              Hire now
            </Button>
          </Link>
          <Link href={"/job"}>
            <Button
              size="lg"
              variant="secondary"
              className="bg-transparent hover:bg-green-800 border-2 border-green-900 hover:border-green-800 text-white px-6 py-4 text-lg font-medium rounded-lg duration-300"
            >
              Get hired
            </Button>
          </Link>
        </div>
        <div className="flex flex-row flex-wrap justify-center items-center gap-12">
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
            </Avatar>
          </div>
        </div>
        <p className="text-center">
          {homeStatistics ? homeStatistics.totalUsers : "1.200"}+ applicants
          already joined
        </p>
      </div>
    </section>
  );
}
