"use strict";
// import { AlertTriangle, CheckCircle, Users } from "lucide-react";
// import { PricingCard } from "../common/pricing/pricing-card";
// import { StatsCard } from "../shared/stats-card";
// const stats = [
//     {
//         title: "Expired",
//         value: "40,689",
//         icon: Users,
//     },
//     {
//         title: "Active",
//         value: "3,689 ",
//         icon: CheckCircle,
//     },
//     {
//         title: "Failed Subscriptions",
//         value: "14,154",
//         icon: AlertTriangle,
//     },
// ];
// const pricingPlans = [
//     {
//         title: "Starter",
//         price: "(Free)",
//         features: ["1 Free Job Post / Month", "Basic Job Filters"],
//         isPopular: false,
//     },
//     {
//         title: "Pro",
//         price: "£ 10 / Monthly",
//         features: ["Unlimited Job Posts", "Freelance, Part-Time, Apprenticeship & Guest Spot Options", "Candidate Applications Direct to Your Inbox"],
//         isPopular: true,
//     },
//     {
//         title: "Business",
//         price: "£ 99 / Yearly",
//         features: ["Unlimited Job Posts", "Priority Placement in Search Results", "Monthly Insights on Your Job Reach"],
//         isPopular: false,
//     },
// ];
// export default function Subscription() {
//     return (
//         <div>
//             <StatsCard stats={stats} />
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
//                 {pricingPlans.map((plan, index) => (
//                     <PricingCard key={index} title={plan.title} price={plan.price} features={plan.features} isPopular={plan.isPopular} />
//                 ))}
//             </div>
//         </div>
//     );
// }
// "use client";
// import { PricingCard } from "../common/pricing/pricing-card";
// import { StatsCard } from "../shared/stats-card";
// import { AlertTriangle, CheckCircle, Users } from "lucide-react";
// import { useGetPlansQuery } from "@/redux/features/planApi";
// import { Button } from "../ui/button";
// export default function Subscription() {
//     const { data: plansData, isLoading } = useGetPlansQuery();
//     // Keep your stats the same (static) or adapt if you want dynamic counts
//     const stats = [
//         { title: "Expired", value: "40,689", icon: Users },
//         { title: "Active", value: "3,689", icon: CheckCircle },
//         { title: "Failed Subscriptions", value: "14,154", icon: AlertTriangle },
//     ];
//     console.log(plansData);
//     return (
//         <div>
//             <StatsCard stats={stats} />
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{isLoading ? <p>Loading plans...</p> : plansData?.map((plan) => <PricingCard key={plan._id} _id={plan._id} title={plan.title} price={plan.price ?? 0} duration={plan.duration} features={plan.features ?? []} />)}</div>
//             <div className="mt-10">
//                 <Button className=" px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 text-white group-hover:text-white bg-green-900 duration-300">Create Plan</Button>
//             </div>
//         </div>
//     );
// }
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Subscription;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const pricing_card_1 = require("../common/pricing/pricing-card");
const stats_card_1 = require("../shared/stats-card");
const lucide_react_1 = require("lucide-react");
const planApi_1 = require("@/redux/features/planApi");
const button_1 = require("../ui/button");
const dialog_1 = require("@/components/ui/dialog");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const select_1 = require("@/components/ui/select");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
function Subscription() {
    var _a, _b, _c, _d;
    const { data, isLoading, refetch } = (0, planApi_1.useGetPlansQuery)();
    // Safely extract plans and meta
    const planData = (_a = data === null || data === void 0 ? void 0 : data.plans) !== null && _a !== void 0 ? _a : [];
    const meta = data === null || data === void 0 ? void 0 : data.meta;
    const [createPlan] = (0, planApi_1.useCreatePlanMutation)();
    // Form state
    const [isCreateModalOpen, setIsCreateModalOpen] = (0, react_1.useState)(false);
    const [newTitle, setNewTitle] = (0, react_1.useState)("");
    const [newDescription, setNewDescription] = (0, react_1.useState)("");
    const [newPrice, setNewPrice] = (0, react_1.useState)("");
    const [newDuration, setNewDuration] = (0, react_1.useState)("1 month");
    const [newFeatures, setNewFeatures] = (0, react_1.useState)("");
    // Stats (static, keep your original design)
    const stats = [
        { title: "Expired", value: ((_b = meta === null || meta === void 0 ? void 0 : meta.expiredSubscriptions) === null || _b === void 0 ? void 0 : _b.toLocaleString()) || "0", icon: lucide_react_1.Users },
        { title: "Active", value: ((_c = meta === null || meta === void 0 ? void 0 : meta.activeSubscriptions) === null || _c === void 0 ? void 0 : _c.toLocaleString()) || "0", icon: lucide_react_1.CheckCircle },
        { title: "Failed Subscriptions", value: ((_d = meta === null || meta === void 0 ? void 0 : meta.failedSubscriptions) === null || _d === void 0 ? void 0 : _d.toLocaleString()) || "0", icon: lucide_react_1.AlertTriangle },
    ];
    // Determine paymentType dynamically
    const getPaymentType = (duration) => (duration === "1 year" || duration === "6 months" ? "Yearly" : "Monthly");
    const handleCreatePlan = async () => {
        if (!newTitle.trim())
            return sweetalert2_1.default.fire("Error", "Plan title is required", "error");
        if (!newDescription.trim())
            return sweetalert2_1.default.fire("Error", "Description is required", "error");
        // Close the modal first
        setIsCreateModalOpen(false);
        try {
            await createPlan({
                title: newTitle,
                description: newDescription,
                price: Number(newPrice),
                duration: newDuration,
                paymentType: getPaymentType(newDuration),
                features: newFeatures.split("\n").filter((f) => f.trim() !== ""),
                status: "Active",
            }).unwrap();
            sweetalert2_1.default.fire("Success", "Plan created successfully", "success");
            // Reset form
            setNewTitle("");
            setNewDescription("");
            setNewPrice("");
            setNewDuration("1 month");
            setNewFeatures("");
            refetch();
        }
        catch (err) {
            console.error(err);
            sweetalert2_1.default.fire("Error", "Failed to create plan", "error");
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-10", children: [(0, jsx_runtime_1.jsx)(stats_card_1.StatsCard, { stats: stats }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: isLoading ? (0, jsx_runtime_1.jsx)("p", { children: "Loading plans..." }) : planData === null || planData === void 0 ? void 0 : planData.map((plan) => { var _a, _b; return (0, jsx_runtime_1.jsx)(pricing_card_1.PricingCard, { _id: plan._id, title: plan.title, price: (_a = plan.price) !== null && _a !== void 0 ? _a : 0, duration: plan.duration, features: (_b = plan.features) !== null && _b !== void 0 ? _b : [] }, plan._id); }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-10 flex justify-center", children: (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { open: isCreateModalOpen, onOpenChange: setIsCreateModalOpen, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "px-8 py-6 text-lg font-medium rounded-lg border border-gray-300 text-white bg-green-900 hover:bg-green-800 duration-300", children: "Create Plan" }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "sm:max-w-lg", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "Create New Plan" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-4 py-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid gap-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "title", children: "Plan Title" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "title", value: newTitle, onChange: (e) => setNewTitle(e.target.value) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "description", children: "Description" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "description", rows: 3, value: newDescription, onChange: (e) => setNewDescription(e.target.value) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "price", children: "Price (\u00A3)" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "price", type: "number", value: newPrice, onChange: (e) => setNewPrice(Number(e.target.value)) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "duration", children: "Duration" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: newDuration, onValueChange: (val) => setNewDuration(val), children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select duration" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "1 month", children: "1 Month" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "3 months", children: "3 Months" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "6 months", children: "6 Months" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "1 year", children: "1 Year" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "features", children: "Features (one per line)" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "features", rows: 6, value: newFeatures, onChange: (e) => setNewFeatures(e.target.value) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-2 mt-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: () => { }, children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "bg-green-900 hover:bg-green-800", onClick: handleCreatePlan, children: "Create" })] })] })] }) })] }));
}
