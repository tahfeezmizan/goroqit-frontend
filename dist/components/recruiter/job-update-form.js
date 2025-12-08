"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobUpdateForm = JobUpdateForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const radio_group_1 = require("@/components/ui/radio-group");
const select_1 = require("@/components/ui/select");
const textarea_1 = require("@/components/ui/textarea");
const categoryApi_1 = require("@/redux/features/categoryApi");
const jobsApi_1 = require("@/redux/features/jobsApi");
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const sonner_1 = require("sonner");
function JobUpdateForm() {
    const { register, handleSubmit, control, formState: { errors }, reset, } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            title: "",
            category: "",
            jobLocation: "",
            type: undefined,
            startDate: undefined,
            endDate: undefined,
            minSalary: 0,
            maxSalary: 0,
            description: "",
            responsibilities: "",
        },
    });
    const { id } = (0, navigation_1.useParams)();
    const route = (0, navigation_1.useRouter)();
    const { data: categories, isLoading } = (0, categoryApi_1.useGetAllCategoryQuery)({});
    const { data: jobs } = (0, jobsApi_1.useGetAllJobsQuery)({});
    const [updateJob] = (0, jobsApi_1.useUpdateJobMutation)();
    const job = jobs === null || jobs === void 0 ? void 0 : jobs.find((job) => job._id === id);
    (0, react_1.useEffect)(() => {
        var _a;
        if (job) {
            reset({
                title: job.title || "",
                // ✅ Fixed: Extract _id from category object to match SelectItem value
                category: ((_a = job.category) === null || _a === void 0 ? void 0 : _a._id) || job.category || "",
                jobLocation: job.jobLocation || "",
                type: job.type || undefined,
                startDate: job.startDate ? job.startDate.split("T")[0] : undefined,
                endDate: job.endDate ? job.endDate.split("T")[0] : undefined,
                minSalary: job.minSalary || 0,
                maxSalary: job.maxSalary || 0,
                description: job.description || "",
                responsibilities: job.responsibilities || "",
            });
        }
    }, [job, reset]);
    const onSubmit = async (data) => {
        const updateData = {
            title: data.title,
            category: data.category,
            jobLocation: data.jobLocation,
            type: data.type,
            startDate: data.startDate ? new Date(data.startDate).toISOString() : null,
            endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
            minSalary: Number(data.minSalary),
            maxSalary: Number(data.maxSalary),
            description: data.description,
            responsibilities: data.responsibilities,
        };
        try {
            const res = await updateJob({
                id: id,
                data: updateData,
            }).unwrap();
            if (res.success) {
                sonner_1.toast.success("✅ Job Update Sucessfully");
                route.push("/recruiter/jobs");
            }
        }
        catch (error) {
            sonner_1.toast.error("❌ Job creation failed");
            // console.error("❌ Job creation failed:", error);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-6 rounded-lg bg-white", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold text-gray-900 mb-6", children: "Update Job" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4 ", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "title", className: "text-lg font-medium text-gray-90", children: "Job Title" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "title", placeholder: "Hair Stylist" }, register("title", { required: "Job title is required" }), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full" })), errors.title && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.title.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "category", className: "text-lg font-medium text-gray-90", children: "Job Category" }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "category", control: control, rules: { required: "Job category is required" }, render: ({ field }) => ((0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: field.onChange, value: field.value, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select category" }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: categories === null || categories === void 0 ? void 0 : categories.map((category) => ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: category.name, children: category.name }, category._id))) })] })) }), errors.category && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.category.message }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-90", children: "Employment Type" }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "type", control: control, rules: { required: "Employment type is required" }, render: ({ field }) => ((0, jsx_runtime_1.jsxs)(radio_group_1.RadioGroup, { value: field.value, onValueChange: field.onChange, className: "flex items-center space-x-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, { value: "Full-time", id: "Full-time" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "Full-time", className: "text-md font-medium text-gray-600", children: "Full-time" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, { value: "Remote", id: "Remote" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "Remote", className: "text-md font-medium text-gray-600", children: "Remote" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, { value: "Freelance", id: "Freelance" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "Freelance", className: "text-md font-medium text-gray-600", children: "Freelance" })] })] })) }), errors.type && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.type.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "jobLocation", className: "text-lg font-medium text-gray-90", children: "Job Location" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "jobLocation", placeholder: "Job location" }, register("jobLocation", {
                                        required: "jobLocation is required",
                                    }), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full" })), errors.jobLocation && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.jobLocation.message }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "startDate", className: "text-lg font-medium text-gray-90", children: "Starting Date" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "startDate", type: "date" }, register("startDate", {
                                                required: "Starting date is required",
                                            }), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full pl-10" })), (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" })] }), errors.startDate && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.startDate.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "endDate", className: "text-lg font-medium text-gray-90", children: "End Date" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "endDate", type: "date" }, register("endDate", { required: "End date is required" }), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full pl-10" })), (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" })] }), errors.endDate && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.endDate.message }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-90", children: "Salary Range" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ type: "number", placeholder: "Min" }, register("minSalary", {
                                        required: "Minimum salary is required",
                                    }), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full" })), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ type: "number", placeholder: "Max" }, register("maxSalary", {
                                        required: "Maximum salary is required",
                                    }), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full" }))] }), (errors.minSalary || errors.maxSalary) && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: "Salary range is required" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "description", className: "text-lg font-medium text-gray-90", children: "Job Description" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, Object.assign({ id: "description", placeholder: "Describe the role" }, register("description", {
                                required: "Job description is required",
                            }), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full min-h-[120px] resize-none" })), errors.description && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.description.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "responsibilities", className: "text-lg font-medium text-gray-90", children: "Job Responsibilities" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, Object.assign({ id: "responsibilities", placeholder: "Describe the Job responsibilities" }, register("responsibilities", {
                                required: "Job responsibilities are required",
                            }), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full min-h-[120px] resize-none" })), errors.responsibilities && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.responsibilities.message }))] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full bg-green-900 hover:bg-green-800 text-white px-8 py-6 mt-5 text-lg font-medium rounded-lg", children: isLoading ? "Update..." : "Update Job Post" })] })] }));
}
