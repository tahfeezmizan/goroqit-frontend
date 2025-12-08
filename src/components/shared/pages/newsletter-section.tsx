"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateNewsletterMutation } from "@/redux/features/newsletterApi";
import { toast } from "sonner";
import { ApiError } from "@/types/types";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [createNewsletter] = useCreateNewsletterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");

    try {
      const res = await createNewsletter({ email }).unwrap();

      // ✅ Handle success
      if (res?.success) {
        toast.success("Thanks for subscribing! Exciting updates are coming your way");
      } else {
        toast.error(res?.message || "Something went wrong. Please try again.");
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      const msg =
        err?.data?.errorMessages?.[0]?.message ||
        err?.data?.message ||
        "An unexpected error occurred.";

      toast.error(
        msg.includes("E11000 duplicate key")
          ? "This email is already subscribed."
          : msg
      );
    }
  };

  return (
    <section className="bg-[#414652] py-20 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-balance">
              Subscribe to our Newsletter
            </h2>
            <p className="text-gray-200 text-md md:text-xl font-normal  md:pr-20">
              Subscribe for Updates: Stay informed about the latest investor
              updates, financial results, and announcements by subscribing to
              our newsletter.
            </p>
          </div>

          {/* Right side - Email form */}
          <div className="lg:justify-self-end w-full lg:max-w-md bg-[#FFFFFF1A] !text-white overflow-hidden rounded-md">
            <form onSubmit={handleSubmit} className="flex ">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-none outline-none rounded-lg py-8 !text-xl !text-white"
              />
              <Button
                type="submit"
                className="bg-white py-8 text-slate-600 hover:bg-gray-100 font-medium px-6 rounded-none "
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
