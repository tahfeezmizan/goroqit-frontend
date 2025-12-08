"use client";

import heroBg from "@/assets/talent-hero-img.png";

export default function FindTalentHero() {
  return (
    <section
      className="pb-20 px-4  pt-40 "
      style={{
        backgroundImage: `url(${heroBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl md:text-5xl font-bold text-white text-balance">
            Top Talent Ready to Work
          </h2>
          <p className="text-gray-200 text-md md:text-2xl font-normal px-0 lg:px-40 leading-snug">
            Discover verified professionals who are open for work right now.
            Browse their profiles, check ratings, and connect instantly.
          </p>
        </div>
      </div>
    </section>
  );
}
