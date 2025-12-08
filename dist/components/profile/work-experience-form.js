"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkExperienceForm = WorkExperienceForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const userApi_1 = require("@/redux/features/userApi");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const sonner_1 = require("sonner");
function WorkExperienceForm() {
    const [formData, setFormData] = (0, react_1.useState)({
        jobTitle: "",
        companyName: "",
        location: "",
        employmentType: "",
        startDate: "",
        endDate: "",
        experience: "",
    });
    const [workExperiences, setWorkExperiences] = (0, react_1.useState)([]);
    const [editingIndex, setEditingIndex] = (0, react_1.useState)(null);
    const [updateProfile, { isLoading }] = (0, userApi_1.useUpdateProfileMutation)();
    const { data: userData, refetch, isLoading: isUserLoading, } = (0, userApi_1.useGetMeQuery)("");
    (0, react_1.useEffect)(() => {
        var _a, _b, _c;
        console.log("Full user data received:", userData);
        if (userData) {
            if ((_a = userData === null || userData === void 0 ? void 0 : userData.profile) === null || _a === void 0 ? void 0 : _a.workExperience) {
                console.log("Work Experience data found:", userData === null || userData === void 0 ? void 0 : userData.profile.workExperience);
                if (Array.isArray((_b = userData === null || userData === void 0 ? void 0 : userData.profile) === null || _b === void 0 ? void 0 : _b.workExperience)) {
                    // Convert any numeric values to strings for form compatibility
                    const formattedWorkExperiences = (_c = userData === null || userData === void 0 ? void 0 : userData.profile) === null || _c === void 0 ? void 0 : _c.workExperience.map((exp) => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        return ({
                            jobTitle: ((_a = exp.jobTitle) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                            companyName: ((_b = exp.companyName) === null || _b === void 0 ? void 0 : _b.toString()) || "",
                            location: ((_c = exp.location) === null || _c === void 0 ? void 0 : _c.toString()) || "",
                            employmentType: ((_d = exp.employmentType) === null || _d === void 0 ? void 0 : _d.toString()) || "",
                            startDate: ((_e = exp.startDate) === null || _e === void 0 ? void 0 : _e.toString()) || "",
                            endDate: ((_f = exp.endDate) === null || _f === void 0 ? void 0 : _f.toString()) || "",
                            experience: ((_g = exp.experience) === null || _g === void 0 ? void 0 : _g.toString()) || "",
                        });
                    });
                    console.log("Formatted work experiences for state:", formattedWorkExperiences);
                    setWorkExperiences(formattedWorkExperiences);
                }
            }
            else {
                console.log("No work experience data found in userData.data");
            }
        }
        else {
            console.log("No userData or userData.data available");
        }
    }, [userData]);
    // Debug effect to track work experiences state
    (0, react_1.useEffect)(() => {
        console.log("Current work experiences state:", workExperiences);
    }, [workExperiences]);
    const handleInputChange = (field, value) => {
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [field]: value })));
    };
    // Check if current form is valid
    const isFormValid = () => {
        // Basic field validation
        const allFieldsFilled = formData.jobTitle.trim() !== "" &&
            formData.companyName.trim() !== "" &&
            formData.location.trim() !== "" &&
            formData.employmentType.trim() !== "" &&
            formData.startDate.trim() !== "" &&
            formData.endDate.trim() !== "" &&
            formData.experience.trim() !== "";
        // Date validation
        if (!allFieldsFilled)
            return false;
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);
        // Check if dates are valid
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return false;
        }
        // Check if end date is after start date
        if (endDate <= startDate) {
            return false;
        }
        return true;
    };
    // Check if save button should be enabled (has at least one work experience)
    const isSaveEnabled = () => {
        return workExperiences.length > 0;
    };
    const handleAddExperience = async () => {
        var _a;
        // Enhanced validation with specific error messages
        if (formData.jobTitle.trim() === "") {
            sonner_1.toast.error("Please enter a job title");
            return;
        }
        if (formData.companyName.trim() === "") {
            sonner_1.toast.error("Please enter a company name");
            return;
        }
        if (formData.location.trim() === "") {
            sonner_1.toast.error("Please enter a location");
            return;
        }
        if (formData.employmentType.trim() === "") {
            sonner_1.toast.error("Please enter an employment type");
            return;
        }
        if (formData.startDate.trim() === "") {
            sonner_1.toast.error("Please select a start date");
            return;
        }
        if (formData.endDate.trim() === "") {
            sonner_1.toast.error("Please select an end date");
            return;
        }
        if (formData.experience.trim() === "") {
            sonner_1.toast.error("Please enter your experience duration");
            return;
        }
        // Date validation
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);
        if (isNaN(startDate.getTime())) {
            sonner_1.toast.error("Please enter a valid start date");
            return;
        }
        if (isNaN(endDate.getTime())) {
            sonner_1.toast.error("Please enter a valid end date");
            return;
        }
        if (endDate <= startDate) {
            sonner_1.toast.error("End date must be after start date");
            return;
        }
        try {
            let updatedWorkExperiences;
            if (editingIndex !== null) {
                // Update existing work experience
                updatedWorkExperiences = [...workExperiences];
                updatedWorkExperiences[editingIndex] = Object.assign({}, formData);
                setWorkExperiences(updatedWorkExperiences);
                setEditingIndex(null);
            }
            else {
                // Add new work experience
                updatedWorkExperiences = [...workExperiences, Object.assign({}, formData)];
                setWorkExperiences(updatedWorkExperiences);
            }
            // Reset form after adding/updating
            setFormData({
                jobTitle: "",
                companyName: "",
                location: "",
                employmentType: "",
                startDate: "",
                endDate: "",
                experience: "",
            });
            // Prepare data for API call
            const workExperiencesForAPI = updatedWorkExperiences.map((exp) => ({
                jobTitle: exp.jobTitle,
                companyName: exp.companyName,
                location: exp.location,
                employmentType: exp.employmentType,
                startDate: exp.startDate,
                endDate: exp.endDate,
                experience: exp.experience,
            }));
            console.log("Sending work experiences to API:", workExperiencesForAPI);
            // Call API to save to database
            const response = await updateProfile({
                body: { workExperience: workExperiencesForAPI },
            }).unwrap();
            console.log("Add/Update API response:", response);
            if (editingIndex !== null) {
                sonner_1.toast.success("Work experience updated and saved to database!");
            }
            else {
                sonner_1.toast.success("Work experience added and saved to database!");
            }
            // Refetch to ensure data consistency
            await refetch();
        }
        catch (error) {
            console.error("Add/Update API error:", error);
            // Revert local state if API call failed
            setWorkExperiences(workExperiences);
            let errorMessage = "Failed to save work experience to database";
            if ((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message) {
                errorMessage = error.data.message;
            }
            sonner_1.toast.error(errorMessage);
        }
    };
    const handleEditExperience = (index) => {
        if (index >= 0 && index < workExperiences.length) {
            const experienceToEdit = workExperiences[index];
            setFormData(Object.assign({}, experienceToEdit));
            setEditingIndex(index);
            // Scroll to top of form for better UX
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    const handleDeleteExperience = async (index) => {
        var _a;
        console.log("handleDeleteExperience called with index:", index);
        console.log("Current workExperiences length:", workExperiences.length);
        if (index < 0 || index >= workExperiences.length) {
            console.error("Invalid index for deletion:", index);
            sonner_1.toast.error("Invalid experience selected for deletion");
            return;
        }
        const confirmed = window.confirm("Are you sure you want to delete this work experience?");
        if (confirmed) {
            try {
                console.log("Proceeding with deletion...");
                // Create new array without the item at index
                const newWorkExperiences = [...workExperiences];
                newWorkExperiences.splice(index, 1);
                console.log("New workExperiences after deletion:", newWorkExperiences);
                // Update local state first for immediate UI feedback
                setWorkExperiences(newWorkExperiences);
                // Prepare data for API call
                const workExperiencesForAPI = newWorkExperiences.map((exp) => ({
                    jobTitle: exp.jobTitle,
                    companyName: exp.companyName,
                    location: exp.location,
                    employmentType: exp.employmentType,
                    startDate: exp.startDate,
                    endDate: exp.endDate,
                    experience: exp.experience,
                }));
                console.log("Sending updated work experiences to API:", workExperiencesForAPI);
                // Call API to update database
                const response = await updateProfile({
                    body: { workExperience: workExperiencesForAPI },
                }).unwrap();
                console.log("Delete API response:", response);
                sonner_1.toast.success("Work experience deleted and saved to database!");
                // Handle editing state
                if (editingIndex === index) {
                    console.log("Was editing the deleted item, clearing form");
                    setEditingIndex(null);
                    setFormData({
                        jobTitle: "",
                        companyName: "",
                        location: "",
                        employmentType: "",
                        startDate: "",
                        endDate: "",
                        experience: "",
                    });
                }
                else if (editingIndex !== null && editingIndex > index) {
                    console.log("Adjusting editing index from", editingIndex, "to", editingIndex - 1);
                    setEditingIndex(editingIndex - 1);
                }
                // Refetch to ensure data consistency
                await refetch();
            }
            catch (error) {
                console.error("Delete API error:", error);
                // Revert local state if API call failed
                setWorkExperiences(workExperiences);
                let errorMessage = "Failed to delete work experience from database";
                if ((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message) {
                    errorMessage = error.data.message;
                }
                sonner_1.toast.error(errorMessage);
            }
        }
    };
    const handleSave = async () => {
        var _a, _b, _c, _d, _e, _f;
        if (!isSaveEnabled()) {
            sonner_1.toast.error("Please add at least one work experience before saving");
            return;
        }
        try {
            console.log("Saving work experiences to database:", workExperiences);
            // Let's debug by trying different approaches
            // First, let's see what education sends when it works
            console.log("=== DEBUGGING WORK EXPERIENCE API CALL ===");
            // Method 1: Exactly like education form (simple object mapping)
            const workExperiencesForAPI = workExperiences.map((exp) => ({
                jobTitle: exp.jobTitle,
                companyName: exp.companyName,
                location: exp.location,
                employmentType: exp.employmentType,
                startDate: exp.startDate,
                endDate: exp.endDate,
                experience: exp.experience,
            }));
            console.log("Method 1 - Formatted work experiences for API:", workExperiencesForAPI);
            console.log("Method 1 - Request body:", {
                workExperience: workExperiencesForAPI,
            });
            // Try to send the request
            const response = await updateProfile({
                body: { workExperience: workExperiencesForAPI },
            }).unwrap();
            sonner_1.toast.success("Work experience information saved successfully!");
            console.log("Work experience saved to database - API response:", response);
            // Force refetch to ensure we have the latest data
            const refreshedData = await refetch();
            console.log("Refreshed data after save:", refreshedData);
        }
        catch (error) {
            console.error("=== DETAILED ERROR ANALYSIS ===");
            console.error("Full error object:", error);
            console.error("Error status:", error === null || error === void 0 ? void 0 : error.status);
            console.error("Error data:", error === null || error === void 0 ? void 0 : error.data);
            console.error("Error message:", (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message);
            console.error("Error messages array:", (_b = error === null || error === void 0 ? void 0 : error.data) === null || _b === void 0 ? void 0 : _b.errorMessages);
            console.error("Error stack:", (_c = error === null || error === void 0 ? void 0 : error.data) === null || _c === void 0 ? void 0 : _c.stack);
            // Try alternative approach if the first method fails
            if (((_d = error === null || error === void 0 ? void 0 : error.data) === null || _d === void 0 ? void 0 : _d.message) === "Cast Error") {
                console.log("=== TRYING ALTERNATIVE METHODS ===");
                try {
                    // Method 2: Try with snake_case fields (common in some APIs)
                    const altWorkExperience = workExperiences.map((exp) => ({
                        job_title: exp.jobTitle,
                        company_name: exp.companyName,
                        location: exp.location,
                        employment_type: exp.employmentType,
                        start_date: exp.startDate,
                        end_date: exp.endDate,
                        experience: exp.experience,
                    }));
                    console.log("Method 2 - Snake case attempt:", {
                        workExperience: altWorkExperience,
                    });
                    const altResponse = await updateProfile({
                        body: { workExperience: altWorkExperience },
                    }).unwrap();
                    sonner_1.toast.success("Work experience saved with alternative format!");
                    await refetch();
                    return;
                }
                catch (altError) {
                    console.error("Method 2 also failed:", altError);
                }
                try {
                    // Method 3: Try with work_experience key instead of workExperience
                    const workExp = workExperiences.map((exp) => ({
                        jobTitle: exp.jobTitle,
                        companyName: exp.companyName,
                        location: exp.location,
                        employmentType: exp.employmentType,
                        startDate: exp.startDate,
                        endDate: exp.endDate,
                        experience: exp.experience,
                    }));
                    console.log("Method 3 - Different key attempt:", {
                        work_experience: workExp,
                    });
                    const altResponse2 = await updateProfile({
                        body: { work_experience: workExp },
                    }).unwrap();
                    sonner_1.toast.success("Work experience saved with work_experience key!");
                    await refetch();
                    return;
                }
                catch (altError2) {
                    console.error("Method 3 also failed:", altError2);
                }
            }
            let errorMessage = "Failed to save work experience information";
            if ((_e = error === null || error === void 0 ? void 0 : error.data) === null || _e === void 0 ? void 0 : _e.message) {
                errorMessage = `${error.data.message}`;
                if ((_f = error === null || error === void 0 ? void 0 : error.data) === null || _f === void 0 ? void 0 : _f.errorMessages) {
                    errorMessage += `: ${error.data.errorMessages
                        .map((e) => `${e.path} - ${e.message}`)
                        .join(", ")}`;
                }
            }
            sonner_1.toast.error(errorMessage);
        }
    };
    const handleCancelEdit = () => {
        setEditingIndex(null);
        setFormData({
            jobTitle: "",
            companyName: "",
            location: "",
            employmentType: "",
            startDate: "",
            endDate: "",
            experience: "",
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-8", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-3xl font-semibold text-gray-900 mb-4", children: "Experience" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "jobTitle", children: "Job Title" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "jobTitle", value: formData.jobTitle, onChange: (e) => handleInputChange("jobTitle", e.target.value), placeholder: "Senior Barber", className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "companyName", children: "Company Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "companyName", value: formData.companyName, onChange: (e) => handleInputChange("companyName", e.target.value), placeholder: "Luxe Beauty Lounge", className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "location", children: "Location" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "location", value: formData.location, onChange: (e) => handleInputChange("location", e.target.value), placeholder: "London", className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "employmentType", children: "Employment Type" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "employmentType", value: formData.employmentType, onChange: (e) => handleInputChange("employmentType", e.target.value), placeholder: "Full Time", className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "startDate", children: "Start Date" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "startDate", type: "date", value: formData.startDate, onChange: (e) => handleInputChange("startDate", e.target.value), className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "endDate", children: "End Date" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "endDate", type: "date", value: formData.endDate, min: formData.startDate || undefined, onChange: (e) => handleInputChange("endDate", e.target.value), className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "experience", children: "Experience" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "experience", value: formData.experience, onChange: (e) => handleInputChange("experience", e.target.value), placeholder: "2 Years", className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleAddExperience, type: "button", disabled: !isFormValid() || isLoading, className: `px-8 py-4 text-lg font-medium rounded-lg flex items-center gap-2 ${isFormValid() && !isLoading
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"}`, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }), isLoading
                                ? "Saving..."
                                : editingIndex !== null
                                    ? "Update Experience"
                                    : "Add Work Experience"] }), editingIndex !== null && ((0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleCancelEdit, type: "button", className: "bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 text-lg font-medium rounded-lg", children: "Cancel Edit" })), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleSave, type: "button", disabled: !isSaveEnabled() || isLoading, className: `px-8 py-4 text-lg font-medium rounded-lg flex items-center gap-2 ${isSaveEnabled() && !isLoading
                            ? "bg-green-900 hover:bg-green-800 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"}`, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Save, { className: "h-4 w-4" }), isLoading ? "Saving..." : "Save All Experience"] })] }), (workExperiences.length > 0 || isUserLoading) && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-8", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-2xl font-semibold text-gray-900 mb-4", children: isUserLoading
                            ? "Loading work experience data..."
                            : `Added Work Experience (${workExperiences.length})` }), isUserLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center py-8", children: (0, jsx_runtime_1.jsx)("div", { className: "animate-spin h-8 w-8 border-2 border-green-600 border-t-transparent rounded-full" }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: workExperiences.map((experience, index) => ((0, jsx_runtime_1.jsx)("div", { className: `border rounded-lg p-6 bg-white shadow-sm ${editingIndex === index
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200"}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("h5", { className: "text-lg font-semibold text-gray-900", children: experience.jobTitle }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mb-2", children: experience.companyName }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700 font-medium mb-1", children: experience.location }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600", children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Type:" }), " ", experience.employmentType] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Start:" }), " ", new Date(experience.startDate).toLocaleDateString()] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "End:" }), " ", new Date(experience.endDate).toLocaleDateString()] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Experience:" }), " ", experience.experience] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 ml-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: (e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    console.log("Edit button clicked for index:", index);
                                                    handleEditExperience(index);
                                                }, size: "sm", variant: "outline", className: "p-2", type: "button", disabled: isLoading, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: (e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    console.log("Delete button clicked for index:", index);
                                                    console.log("Current workExperiences:", workExperiences);
                                                    handleDeleteExperience(index);
                                                }, size: "sm", variant: "outline", className: "p-2 text-red-600 hover:text-red-700 hover:bg-red-50", type: "button", disabled: isLoading, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4" }) })] })] }) }, `experience-${index}`))) }))] }))] }));
}
