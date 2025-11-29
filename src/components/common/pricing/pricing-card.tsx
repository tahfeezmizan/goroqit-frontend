"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateCheckoutSessionMutation,
  useDeletePlanMutation,
  useUpdatePlanMutation,
} from "@/redux/features/planApi";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

interface PricingCardProps {
  _id: string;
  title: string;
  price: number;
  duration: string;
  features: string[];
  onDeleted?: (id: string) => void;
  paymentLink?: string;
  onEdited?: () => void; // optional for edit callback
}

export function PricingCard({
  _id,
  title,
  price,
  duration,
  features,
  onDeleted,
}: PricingCardProps) {
  const pathName = usePathname();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title,
    price,
    features: features.join("\n"),
  });

  const [updatePlan] = useUpdatePlanMutation();
  const [deletePlan, { isLoading: isDeleteLoading }] = useDeletePlanMutation();
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();

  const handleCheckout = async () => {
    try {
      const res = await createCheckoutSession(_id).unwrap();

      if (res?.url) {
        window.location.href = res.url; // This will redirect to Stripe
      } else {
        console.error("No URL found in response:", res);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  // --- Save changes (Edit Plan) ---
  const handleSaveChanges = async () => {
    try {
      await updatePlan({
        id: _id,
        data: {
          title: editData.title,
          price: Number(editData.price),
          features: editData.features.split("\n"),
        },
      }).unwrap();

      Swal.fire("Success", "Plan updated successfully", "success");
      setIsEditModalOpen(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update plan", "error");
    }
  };

  // --- Delete Plan ---
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deletePlan(_id).unwrap();
        Swal.fire("Deleted!", "Plan has been deleted.", "success");
        onDeleted?.(_id); // notify parent to refetch
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete plan", "error");
      }
    }
  };

  return (
    <Card className="flex flex-col py-12 px-5 bg-white !rounded-md border-none shadow-none hover:bg-[#E7EFEC] duration-300">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
          {editData.title}
        </CardTitle>
        <div className="text-3xl font-bold text-gray-900">
          {price === 0 ? "(Free)" : `£ ${price} / ${duration}`}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-6">
        <div className="flex-1 flex items-center">
          <ul className="space-y-4 w-full">
            {editData.features.split("\n").map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 font-medium !text-lg"
              >
                <div className="flex-shrink-0 w-2 h-2 bg-[#0066FF] rounded-full mt-2"></div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {pathName === "/admin/subscription" ? (
          <div className="space-y-4">
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button className="w-full px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 bg-transparent text-gray-700 hover:text-white hover:bg-green-900 duration-300">
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Pricing Plan</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Plan Title</Label>
                    <Input
                      id="title"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={editData.price}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="features">Features (one per line)</Label>
                    <Textarea
                      id="features"
                      rows={6}
                      value={editData.features}
                      onChange={(e) =>
                        setEditData({ ...editData, features: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveChanges}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={handleDelete}
              className="w-full px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 bg-transparent text-gray-700 hover:text-white hover:bg-green-900 duration-300"
            >
              {isDeleteLoading ? (
                <Loader className="animate-spin size-8" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => handleCheckout()}
            className="w-full px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 bg-transparent text-gray-700 hover:text-white hover:bg-green-900 duration-300"
          >
            {isLoading ? (
              <Loader className="animate-spin size-8" />
            ) : (
              "Get Started"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
