"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote:
      "I found a new chair rental in less than a week. Roqit made it super easy — just a few taps and I was in the salon!",
    author: "Sarah, Hair Stylist (London)",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    featured: false,
  },
  {
    id: 2,
    quote:
      "I found a new chair rental in less than a week. Roqit made it super easy — just a few taps and I was in the salon!",
    author: "Sarah, Hair Stylist (London)",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    featured: true,
  },
  {
    id: 3,
    quote:
      "I found a new chair rental in less than a week. Roqit made it super easy — just a few taps and I was in the salon!",
    author: "Sarah, Hair Stylist (London)",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    featured: false,
  },
  {
    id: 4,
    quote:
      "Amazing platform for finding creative opportunities. The process was seamless and I connected with great clients quickly.",
    author: "Mike, Makeup Artist (NYC)",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    featured: false,
  },
  {
    id: 5,
    quote:
      "Roqit transformed how I find work. The social-style profiles really help showcase my portfolio and connect with the right people.",
    author: "Emma, Beauty Specialist (LA)",
    avatar:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    featured: false,
  },
];

import img from "../../../../public/Curly hair-pana 1.png";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with featured testimonial

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index =
        (currentIndex - 1 + i + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  return (
    <section className="py-20 px-4 bg-[#EBF1FA]">
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 ">
        <div className="hidden lg:block w-[450px] h-[450px] -ml-32 -mb-56">
          <Image
            src={img}
            alt="testimonial image"
            width={500}
            height={500}
            className="w-full h-full"
          />
        </div>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Creatives Like you
          </h2>
        </div>

        {/* Desktop View - 3 Cards */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-8 mb-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${currentIndex}`}
                className={`bg-white rounded-2xl p-8 shadow-md transition-all duration-300 ${
                  index === 1 ? "translate-y-6 " : "bg-[#b9b9b9] blur-xs "
                }`}
              >
                {/* Quote Icon */}
                <div className="mb-6 ">
                  <Quote
                    className={`w-16 h-16 ${
                      index === 1 ? "text-emerald-600 " : "text-gray-300"
                    }`}
                  />
                </div>

                {/* Quote Text */}
                <blockquote
                  className={`text-lg leading-relaxed mb-8 font-medium ${
                    index === 1 ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {testimonial.quote}
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-start gap-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      width={52}
                      height={52}
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p
                      className={`font-semibold text-sm ${
                        index === 1 ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      — {testimonial.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet View - Single Card */}
        <div className="lg:hidden">
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-16 h-16 text-emerald-600" />
              </div>

              <blockquote className="text-gray-900 text-lg leading-relaxed mb-8 font-medium">
                {testimonials[currentIndex].quote}
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    width={52}
                    height={52}
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">
                    — {testimonials[currentIndex].author}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full hover:bg-white/50 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-green-900 w-6"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full hover:bg-white/50 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </section>
  );
}
