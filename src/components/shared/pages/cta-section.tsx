import { Button } from "@/components/ui/button";
import bg from "../../../../public/cta-section-img.png";
import Link from "next/link";

export function CtaSection() {
  return (
    <section
      className="relative h-auto flex 
       items-center lg:items-end  justify-center overflow-hidden py-24 md:py-36"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto  px-4 sm:px-6  text-center text-white">
        <h2 className="text-3xl md:text-6xl font-bold leading-tight text-balance mb-6">
          Ready to Post Your First Job?
        </h2>
        <Link href={"/job"}>
          <Button
            size="lg"
            className="bg-green-900 hover:bg-green-800 text-white px-8 md:px-12 py-4 md:py-6 text-lg font-medium rounded-lg"
          >
            Post a job now
          </Button>
        </Link>
      </div>
    </section>
  );
}
