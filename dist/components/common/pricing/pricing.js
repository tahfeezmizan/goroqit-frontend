"use strict";
// "use client";
// import { PricingCard } from "./pricing-card";
// export default function PricingPage() {
//   const handleGetStarted = (plan: string) => {
//     console.log(`[v0] Selected plan: ${plan}`);
//   };
//   const pricingPlans = [
//     {
//       title: "Starter",
//       price: "(Free)",
//       features: ["1 Free Job Post / Month", "Basic Job Filters"],
//       isPopular: false,
//     },
//     {
//       title: "Pro",
//       price: "£ 10 / Monthly",
//       features: [
//         "Unlimited Job Posts",
//         "Freelance, Part-Time, Apprenticeship & Guest Spot Options",
//         "Candidate Applications Direct to Your Inbox",
//       ],
//       isPopular: true,
//     },
//     {
//       title: "Business",
//       price: "£ 99 / Yearly",
//       features: [
//         "Unlimited Job Posts",
//         "Priority Placement in Search Results",
//         "Monthly Insights on Your Job Reach",
//       ],
//       isPopular: false,
//     },
//   ];
//   return (
//     <div className="bg-[#EBF1FA] pt-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidde">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">
//             Choose your plan
//           </h1>
//           <p className="text-base text-gray-600 max-w-2xl mx-auto text-pretty">
//             Boost your job post to reach more candidates and hire faster.
//           </p>
//         </div>
//         {/* Pricing Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
//           {pricingPlans.map((plan, index) => (
//             <PricingCard
//               key={index}
//               title={plan.title}
//               price={plan.price}
//               features={plan.features}
//               isPopular={plan.isPopular}
//               onGetStarted={() => handleGetStarted(plan.title)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PricingPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const planApi_1 = require("@/redux/features/planApi");
const pricing_card_1 = require("./pricing-card");
function PricingPage() {
    var _a;
    const { data, isLoading } = (0, planApi_1.useGetPlansQuery)();
    // Extract plans safely
    const planData = (_a = data === null || data === void 0 ? void 0 : data.plans) !== null && _a !== void 0 ? _a : [];
    // const handleGetStarted = (plan: string) => {
    //     console.log(`[Landing] Selected plan: ${plan}`);
    // };
    return ((0, jsx_runtime_1.jsx)("div", { className: "bg-[#EBF1FA] pt-10", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-20 overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center mb-12", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-4xl font-bold text-gray-900 mb-4 text-balance", children: "Choose your plan" }), (0, jsx_runtime_1.jsx)("p", { className: "text-base text-gray-600 max-w-2xl mx-auto text-pretty", children: "Boost your job post to reach more candidates and hire faster." })] }), isLoading ? ((0, jsx_runtime_1.jsx)("p", { className: "text-center text-gray-500", children: "Loading plans..." })) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: planData.map((plan) => {
                        var _a, _b, _c;
                        return ((0, jsx_runtime_1.jsx)(pricing_card_1.PricingCard, { _id: plan._id, title: plan.title, price: (_a = plan.price) !== null && _a !== void 0 ? _a : 0, duration: plan.duration, features: (_b = plan.features) !== null && _b !== void 0 ? _b : [], paymentLink: (_c = plan.paymentLink) !== null && _c !== void 0 ? _c : "/" }, plan._id));
                    }) }))] }) }));
}
