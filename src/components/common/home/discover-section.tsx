import Image from "next/image";
import Image1 from "@/assets/discover-section-img (1).png";
import Image2 from "@/assets/discover-section-img (2).png";
import Image3 from "@/assets/discover-section-img (3).png";

export function DiscoverSection() {
  const features = [
    {
      title: "Setup your profile!",
      description:
        "Start by creating an account with basic details. Then, add your professional info and upload your resume. It's quick and easy!",
      image: Image1,
    },
    {
      title: "Describe your job",
      description:
        "Simply enter the job title, describe the role and its responsibilities, and list required skills. It's as straightforward as that!",
      image: Image2,
    },
    {
      title: "Search some talents!",
      description:
        "Browse through profiles, filter by skills or experience, and find the perfect match for your job. It's effortless and efficient!",
      image: Image3,
    },
  ];

  return (
    <div className="bg-[#EBF1FA] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Discover</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 pb-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white text-center rounded-lg p-5 ">
              <Image
                src={feature.image}
                alt={feature.title}
                width={200}
                height={200}
                className="mx-auto w-52 h-52 mb-6"
              />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
