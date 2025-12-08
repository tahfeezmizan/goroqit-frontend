"use strict";
// "use client"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { useState } from "react"
// interface PricingCardProps {
//   title: string
//   price: string
//   features: string[]
//   isPopular?: boolean
//   onGetStarted?: () => void
// }
// export function PricingCard({ title, price, features, onGetStarted }: PricingCardProps) {
//   const pathName = usePathname()
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
//   const [editData, setEditData] = useState({
//     title,
//     price,
//     features: features.join("\n"),
//   })
//   const handleSaveChanges = () => {
//     // Here you would typically call an API to update the pricing plan
//     console.log("Saving changes:", editData)
//     setIsEditModalOpen(false)
//     // Call onGetStarted if provided for additional handling
//     onGetStarted?.()
//   }
//   return (
//     <Card className="flex flex-col py-12 px-5  bg-white !rounded-md border-none shadow-none  group hover:bg-[#E7EFEC] duration-300">
//       <CardHeader className="text-center pb-8">
//         <CardTitle className="text-xl font-semibold text-gray-900 mb-2">{title}</CardTitle>
//         <div className="text-3xl font-bold text-gray-900">{price}</div>
//       </CardHeader>
//       <CardContent className="flex-1 flex flex-col justify-between space-y-6">
//         <div className="flex-1 flex items-center">
//           <ul className="space-y-4 w-full">
//             {features.map((feature, index) => (
//               <li key={index} className="flex items-start gap-3 font-medium !text-lg">
//                 <div className="flex-shrink-0 w-2 h-2 bg-[#0066FF] rounded-full mt-2"></div>
//                 <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         {pathName === "/admin/subscription" ? (
//           <div className="space-y-4">
//             <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//               <DialogTrigger asChild>
//                 <Button className="w-full px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 bg-transparent text-gray-700 group-hover:text-white group-hover:bg-green-900 duration-300">
//                   Edit
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Edit Pricing Plan</DialogTitle>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor="title">Plan Title</Label>
//                     <Input
//                       id="title"
//                       value={editData.title}
//                       onChange={(e) => setEditData({ ...editData, title: e.target.value })}
//                     />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="price">Price</Label>
//                     <Input
//                       id="price"
//                       value={editData.price}
//                       onChange={(e) => setEditData({ ...editData, price: e.target.value })}
//                     />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="features">Features (one per line)</Label>
//                     <Textarea
//                       id="features"
//                       rows={6}
//                       value={editData.features}
//                       onChange={(e) => setEditData({ ...editData, features: e.target.value })}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-end gap-2">
//                   <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
//                     Cancel
//                   </Button>
//                   <Button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700">
//                     Save Changes
//                   </Button>
//                 </div>
//               </DialogContent>
//             </Dialog>
//             <Button
//               onClick={onGetStarted}
//               className="w-full px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 bg-transparent text-gray-700 group-hover:text-white group-hover:bg-green-900 duration-300 "
//             >
//               Delete
//             </Button>
//           </div>
//         ) : (
//           <Link href={"/"}>
//             <Button
//               onClick={onGetStarted}
//               className="w-full px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 bg-transparent text-gray-700 group-hover:text-white group-hover:bg-green-900 duration-300 "
//             >
//               Get Started
//             </Button>
//           </Link>
//         )}
//       </CardContent>
//     </Card>
//   )
// }
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingCard = PricingCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const dialog_1 = require("@/components/ui/dialog");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const planApi_1 = require("@/redux/features/planApi");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
function PricingCard({ _id, title, price, duration, features, paymentLink, onDeleted }) {
    const pathName = (0, navigation_1.usePathname)();
    const [isEditModalOpen, setIsEditModalOpen] = (0, react_1.useState)(false);
    const [editData, setEditData] = (0, react_1.useState)({
        title,
        price,
        features: features.join("\n"),
    });
    const [updatePlan] = (0, planApi_1.useUpdatePlanMutation)();
    const [deletePlan] = (0, planApi_1.useDeletePlanMutation)();
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
            sweetalert2_1.default.fire("Success", "Plan updated successfully", "success");
            setIsEditModalOpen(false);
        }
        catch (err) {
            console.error(err);
            sweetalert2_1.default.fire("Error", "Failed to update plan", "error");
        }
    };
    // --- Delete Plan ---
    const handleDelete = async () => {
        const result = await sweetalert2_1.default.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed) {
            try {
                await deletePlan(_id).unwrap();
                sweetalert2_1.default.fire("Deleted!", "Plan has been deleted.", "success");
                onDeleted === null || onDeleted === void 0 ? void 0 : onDeleted(_id); // notify parent to refetch
            }
            catch (err) {
                console.error(err);
                sweetalert2_1.default.fire("Error", "Failed to delete plan", "error");
            }
        }
    };
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "flex flex-col py-12 px-5 bg-white !rounded-md border-none shadow-none group hover:bg-[#E7EFEC] duration-300", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "text-center pb-8", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-xl font-semibold text-gray-900 mb-2", children: editData.title }), (0, jsx_runtime_1.jsx)("div", { className: "text-3xl font-bold text-gray-900", children: price === 0 ? "(Free)" : `£ ${price} / ${duration}` })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "flex-1 flex flex-col justify-between space-y-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1 flex items-center", children: (0, jsx_runtime_1.jsx)("ul", { className: "space-y-4 w-full", children: editData.features.split("\n").map((feature, index) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-start gap-3 font-medium !text-lg", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0 w-2 h-2 bg-[#0066FF] rounded-full mt-2" }), (0, jsx_runtime_1.jsx)("span", { className: "text-gray-700 text-sm leading-relaxed", children: feature })] }, index))) }) }), pathName === "/admin/subscription" ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { open: isEditModalOpen, onOpenChange: setIsEditModalOpen, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 bg-transparent text-gray-700 group-hover:text-white group-hover:bg-green-900 duration-300", children: "Edit" }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "sm:max-w-[425px]", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "Edit Pricing Plan" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-4 py-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid gap-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "title", children: "Plan Title" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "title", value: editData.title, onChange: (e) => setEditData(Object.assign(Object.assign({}, editData), { title: e.target.value })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "price", children: "Price" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "price", type: "number", value: editData.price, onChange: (e) => setEditData(Object.assign(Object.assign({}, editData), { price: Number(e.target.value) })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "features", children: "Features (one per line)" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "features", rows: 6, value: editData.features, onChange: (e) => setEditData(Object.assign(Object.assign({}, editData), { features: e.target.value })) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: () => setIsEditModalOpen(false), children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleSaveChanges, className: "bg-green-600 hover:bg-green-700", children: "Save Changes" })] })] })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleDelete, className: "w-full px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 bg-transparent text-gray-700 group-hover:text-white group-hover:bg-green-900 duration-300", children: "Delete" })] })) : ((0, jsx_runtime_1.jsx)(link_1.default, { href: paymentLink !== null && paymentLink !== void 0 ? paymentLink : "/", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 bg-transparent text-gray-700 group-hover:text-white group-hover:bg-green-900 duration-300", children: "Get Started" }) }))] })] }));
}
