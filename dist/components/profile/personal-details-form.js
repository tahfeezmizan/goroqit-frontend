"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalDetailsForm = PersonalDetailsForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const select_1 = require("@/components/ui/select");
const userApi_1 = require("@/redux/features/userApi");
const react_hook_form_1 = require("react-hook-form");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const sonner_1 = require("sonner");
const textarea_1 = require("../ui/textarea");
const loading_spinner_1 = __importDefault(require("@/lib/loading-spinner"));
function PersonalDetailsForm() {
    const [skillInput, setSkillInput] = (0, react_1.useState)("");
    const [expertiseInput, setExpertiseInput] = (0, react_1.useState)("");
    // Get user data
    const { data: userData, isLoading: isUserLoading, refetch, } = (0, userApi_1.useGetMeQuery)("");
    const profileData = userData === null || userData === void 0 ? void 0 : userData.profile;
    const { register, handleSubmit, control, setValue, watch, reset, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            firstName: "",
            lastName: "",
            bio: "",
            mobile: "",
            dateOfBirth: "",
            gender: "",
            streetAddress: "",
            city: "",
            country: "",
            skills: [],
            expartes: [],
        },
    });
    // Watch skills and expertise to get real-time updates
    const skills = watch("skills");
    const expartes = watch("expartes");
    // Set form values when user data is loaded
    (0, react_1.useEffect)(() => {
        if (profileData) {
            console.log("Loading profile data:", profileData);
            reset({
                firstName: profileData.firstName || "",
                lastName: profileData.lastName || "",
                mobile: profileData.mobile || "",
                dateOfBirth: profileData.dateOfBirth
                    ? new Date(profileData.dateOfBirth).toISOString().split("T")[0]
                    : "",
                gender: profileData.gender || "",
                streetAddress: profileData.streetAddress || "",
                city: profileData.city || "",
                country: profileData.country || "",
                skills: profileData.skills || [],
                expartes: profileData.expartes || [],
            });
        }
    }, [profileData, reset]);
    const [updateProfile, { isLoading, isError, error }] = (0, userApi_1.useUpdateProfileMutation)();
    const addSkill = () => {
        if (skillInput.trim()) {
            // Always take latest skills from profile + form
            const existingSkills = (profileData === null || profileData === void 0 ? void 0 : profileData.skills) || [];
            const currentSkills = skills || [];
            // Merge old + new
            const mergedSkills = [...new Set([...existingSkills, ...currentSkills])];
            // Check if already exists
            const skillExists = mergedSkills.some((skill) => skill.toLowerCase() === skillInput.trim().toLowerCase());
            if (!skillExists) {
                const updatedSkills = [...mergedSkills, skillInput.trim()];
                setValue("skills", updatedSkills, { shouldValidate: true });
                setSkillInput("");
            }
            else {
                sonner_1.toast.error("This skill already exists");
            }
        }
    };
    const removeSkill = (skillToRemove) => {
        const currentSkills = skills || []; // Use watched skills instead of getValues
        const updatedSkills = currentSkills.filter((skill) => skill !== skillToRemove);
        setValue("skills", updatedSkills, { shouldValidate: true });
    };
    const handleSkillKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };
    // Expertise functions - FIXED: Always include existing expertise
    // Expertise functions
    const addExpertise = () => {
        if (expertiseInput.trim()) {
            const existingExpertise = (profileData === null || profileData === void 0 ? void 0 : profileData.expartes) || [];
            const currentExpertise = expartes || [];
            const mergedExpertise = [
                ...new Set([...existingExpertise, ...currentExpertise]),
            ];
            const expertiseExists = mergedExpertise.some((exp) => exp.toLowerCase() === expertiseInput.trim().toLowerCase());
            if (!expertiseExists) {
                const updatedExpertise = [...mergedExpertise, expertiseInput.trim()];
                setValue("expartes", updatedExpertise, { shouldValidate: true });
                setExpertiseInput("");
            }
            else {
                sonner_1.toast.error("This expertise already exists");
            }
        }
    };
    const removeExpertise = (expertiseToRemove) => {
        const currentExpertise = expartes || []; // Use watched expartes instead of getValues
        const updatedExpertise = currentExpertise.filter((expertise) => expertise !== expertiseToRemove);
        setValue("expartes", updatedExpertise, { shouldValidate: true });
    };
    const handleExpertiseKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addExpertise();
        }
    };
    const onSubmit = async (data) => {
        var _a, _b, _c, _d;
        console.log("Personal Details Form Data:", data);
        const oldSkills = ((_a = profileData === null || profileData === void 0 ? void 0 : profileData.profile) === null || _a === void 0 ? void 0 : _a.skills) || [];
        const oldExpertise = ((_b = profileData === null || profileData === void 0 ? void 0 : profileData.profile) === null || _b === void 0 ? void 0 : _b.expartes) || [];
        const mergedSkills = [...new Set([...oldSkills, ...(data.skills || [])])];
        const mergedExpertise = [
            ...new Set([...oldExpertise, ...(data.expartes || [])]),
        ];
        const finalData = Object.assign(Object.assign({}, data), { skills: mergedSkills, expartes: mergedExpertise });
        const formData = new FormData();
        formData.append("data", JSON.stringify(finalData));
        try {
            const res = await updateProfile({ body: formData });
            console.log("Api", res);
            if ((_c = res === null || res === void 0 ? void 0 : res.data) === null || _c === void 0 ? void 0 : _c.success) {
                sonner_1.toast.success("Profile updated successfully");
                refetch();
            }
            else {
                sonner_1.toast.error(((_d = res === null || res === void 0 ? void 0 : res.data) === null || _d === void 0 ? void 0 : _d.message) || "Failed to update profile");
            }
        }
        catch (error) {
            console.log(error);
            sonner_1.toast.error("Error updating profile");
        }
    };
    if (isUserLoading) {
        return (0, jsx_runtime_1.jsx)(loading_spinner_1.default, {});
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-8", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-3xl font-semibold text-gray-900 mb-2", children: "Personal Information" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 items-center gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "firstName", className: "text-lg font-medium text-gray-900", children: "First Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "firstName", placeholder: "John" }, register("firstName"), { className: "mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "lastName", className: "text-lg font-medium text-gray-900", children: "Last Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "lastName", placeholder: "Doe" }, register("lastName"), { className: "mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100" }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "dateOfBirth", className: "text-lg font-medium text-gray-900", children: "Date of Birth" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "dateOfBirth", type: "date" }, register("dateOfBirth"), { className: "mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "gender", className: "text-lg font-medium text-gray-900", children: "Gender" }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "gender", control: control, render: ({ field }) => ((0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: field.onChange, value: field.value, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select gender" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Male", children: "Male" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Female", children: "Female" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Other", children: "Other" })] })] })) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "mobile", className: "text-lg font-medium text-gray-900", children: "Mobile Number" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "mobile", placeholder: "Mobile Number" }, register("mobile"), { minLength: 11, className: "mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100" }))] })] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { className: "m", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "bio", className: "text-lg font-medium text-gray-900", children: "Bio" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, Object.assign({ id: "bio", placeholder: "Describe the role" }, register("bio", {
                            required: "Job bio is required",
                        }), { className: "mt-1 p-4 rounded-lg !text-lg text-black w-full min-h-[120px] resize-none" })), errors.bio && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-sm", children: errors.bio.message }))] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Skills" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { value: skillInput, onChange: (e) => setSkillInput(e.target.value), onKeyPress: handleSkillKeyPress, placeholder: "Add a skill (e.g., JavaScript, React, Node.js)", className: "p-4 rounded-sm !text-lg text-black w-full bg-gray-100" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: addSkill, className: "bg-green-900 hover:bg-green-800 text-white px-6", children: "Add" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: skills && skills.length > 0 ? (skills.map((skill, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm", children: [(0, jsx_runtime_1.jsx)("span", { children: skill }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => removeSkill(skill), className: "hover:text-red-600", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 16 }) })] }, index)))) : ((0, jsx_runtime_1.jsx)("p", { className: "text-gray-500 text-sm", children: "No skills added yet" })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 ", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Expertise" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { value: expertiseInput, onChange: (e) => setExpertiseInput(e.target.value), onKeyPress: handleExpertiseKeyPress, placeholder: "Add an expertise (e.g., Frontend Development, UI/UX Design)", className: "p-4 rounded-sm !text-lg text-black w-full bg-gray-100" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: addExpertise, className: "bg-green-900 hover:bg-green-800 text-white px-6", children: "Add" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: expartes && expartes.length > 0 ? (expartes.map((expertise, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm", children: [(0, jsx_runtime_1.jsx)("span", { children: expertise }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => removeExpertise(expertise), className: "hover:text-red-600", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 16 }) })] }, index)))) : ((0, jsx_runtime_1.jsx)("p", { className: "text-gray-500 text-sm", children: "No expertise added yet" })) })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "Address" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "streetAddress", className: "text-lg font-medium text-gray-900", children: "Street Address" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "streetAddress", placeholder: "123 Main Street" }, register("streetAddress"), { className: "mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "city", className: "text-lg font-medium text-gray-900", children: "City" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "city", placeholder: "General Trias" }, register("city"), { className: "mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "country", className: "text-lg font-medium text-gray-900", children: "Country" }), (0, jsx_runtime_1.jsx)(input_1.Input, Object.assign({ id: "country", placeholder: "Philippines" }, register("country"), { className: "mt-1 p-4 rounded-sm !text-lg text-black w-full bg-gray-100" }))] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "pt-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleSubmit(onSubmit), className: "bg-green-900 hover:bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-sm", disabled: isLoading, children: isLoading ? "Saving..." : "Save Changes" }), isError && ((0, jsx_runtime_1.jsxs)("p", { className: "text-red-500 text-sm mt-2", children: ["Error updating profile: ", error === null || error === void 0 ? void 0 : error.toString()] }))] })] }));
}
