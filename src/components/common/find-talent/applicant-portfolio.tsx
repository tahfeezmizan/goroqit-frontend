import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LoadingSpinner from "@/lib/loading-spinner";
import { getImageUrl } from "@/lib/utils";
import { Portfolio, UserData } from "@/types/profileTypes";
import Image from "next/image";

export default function ApplicantPortfolio({
  data,
}: {
  data: UserData | undefined;
}) {
  const portfolios = data?.profile?.portfolio;

  if (!portfolios) {
    return <LoadingSpinner />;
  }

  // ✅ If array is empty, show "No data available"
  if (portfolios.length === 0) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-500 text-sm">
        No data available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {portfolios.map((item: Portfolio, index: number) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 transition-all group relative overflow-hidden"
        >
          {/* --- Carousel --- */}
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {item.portfolioImages?.map((img: string, i: number) => (
                  <CarouselItem key={i} className="relative aspect-[4/3]">
                    <Image
                      src={getImageUrl(img)}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Show arrows only on hover */}
              <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-2 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-2 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
          </div>

          {/* --- Content --- */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
