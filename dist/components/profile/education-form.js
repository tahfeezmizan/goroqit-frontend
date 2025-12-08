"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationForm = EducationForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const userApi_1 = require("@/redux/features/userApi");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const sonner_1 = require("sonner");
function EducationForm() {
    const [formData, setFormData] = (0, react_1.useState)({
        degreeTitle: "",
        major: "",
        instituteName: "",
        cgpa: "",
        scale: "",
        yearOfPassing: "",
        duration: "",
    });
    const [educations, setEducations] = (0, react_1.useState)([]);
    const [editingIndex, setEditingIndex] = (0, react_1.useState)(null);
    const [updateProfile, { isLoading }] = (0, userApi_1.useUpdateProfileMutation)();
    const { data: userData, refetch, isLoading: isUserLoading, } = (0, userApi_1.useGetMeQuery)("");
    (0, react_1.useEffect)(() => {
        var _a, _b, _c;
        console.log("Full user data received:", userData);
        if (userData) {
            if ((_a = userData === null || userData === void 0 ? void 0 : userData.profile) === null || _a === void 0 ? void 0 : _a.education) {
                if (Array.isArray((_b = userData === null || userData === void 0 ? void 0 : userData.profile) === null || _b === void 0 ? void 0 : _b.education)) {
                    const formattedEducations = (_c = userData === null || userData === void 0 ? void 0 : userData.profile) === null || _c === void 0 ? void 0 : _c.education.map((edu) => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        return ({
                            degreeTitle: ((_a = edu.degreeTitle) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                            major: ((_b = edu.major) === null || _b === void 0 ? void 0 : _b.toString()) || "",
                            instituteName: ((_c = edu.instituteName) === null || _c === void 0 ? void 0 : _c.toString()) || "",
                            cgpa: ((_d = edu.cgpa) === null || _d === void 0 ? void 0 : _d.toString()) || "",
                            scale: ((_e = edu.scale) === null || _e === void 0 ? void 0 : _e.toString()) || "",
                            yearOfPassing: ((_f = edu.yearOfPassing) === null || _f === void 0 ? void 0 : _f.toString()) || "",
                            duration: ((_g = edu.duration) === null || _g === void 0 ? void 0 : _g.toString()) || "",
                        });
                    });
                    console.log("Formatted educations for state:", formattedEducations);
                    setEducations(formattedEducations);
                }
            }
            else {
                console.log("No education data found in userData.data");
            }
        }
        else {
            console.log("No userData or userData.data available");
        }
    }, [userData]);
    // Debug effect to track educations state
    (0, react_1.useEffect)(() => {
        console.log("Current educations state:", educations);
    }, [educations]);
    const handleInputChange = (field, value) => {
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [field]: value })));
    };
    // Check if current form is valid
    const isFormValid = () => {
        return (formData.degreeTitle.trim() !== "" &&
            formData.major.trim() !== "" &&
            formData.instituteName.trim() !== "" &&
            formData.cgpa.trim() !== "" &&
            formData.scale.trim() !== "" &&
            formData.yearOfPassing.trim() !== "" &&
            formData.duration.trim() !== "");
    };
    // Check if save button should be enabled (has at least one education)
    const isSaveEnabled = () => {
        return educations.length > 0;
    };
    const handleAddEducation = () => {
        if (!isFormValid()) {
            sonner_1.toast.error("Please fill in all fields before adding education");
            return;
        }
        if (editingIndex !== null) {
            // Update existing education
            const updatedEducations = [...educations];
            updatedEducations[editingIndex] = formData;
            setEducations(updatedEducations);
            setEditingIndex(null);
            sonner_1.toast.success("Education updated successfully!");
        }
        else {
            // Add new education
            setEducations((prev) => [...prev, formData]);
            sonner_1.toast.success("Education added successfully!");
        }
        // Reset form after adding/updating
        setFormData({
            degreeTitle: "",
            major: "",
            instituteName: "",
            cgpa: "",
            scale: "",
            yearOfPassing: "",
            duration: "",
        });
    };
    const handleEditEducation = (index) => {
        setFormData(educations[index]);
        setEditingIndex(index);
    };
    const handleDeleteEducation = async (index) => {
        var _a;
        console.log("handleDeleteEducation called with index:", index);
        console.log("Current educations length:", educations.length);
        if (index < 0 || index >= educations.length) {
            console.error("Invalid index for deletion:", index);
            sonner_1.toast.error("Invalid education selected for deletion");
            return;
        }
        const confirmed = window.confirm("Are you sure you want to delete this work experience?");
        if (confirmed) {
            try {
                console.log("Proceeding with deletion...");
                // Create new array without the item at index
                const newEducations = [...educations];
                newEducations.splice(index, 1);
                console.log("New educations after deletion:", newEducations);
                // Update local state first for immediate UI feedback
                setEducations(educations);
                // Prepare data for API call
                const educationsForAPI = newEducations.map((edu) => ({
                    degreeTitle: edu.degreeTitle,
                    major: edu.major,
                    instituteName: edu.instituteName,
                    cgpa: edu.cgpa,
                    scale: edu.scale,
                    yearOfPassing: edu.yearOfPassing,
                    duration: edu.duration,
                }));
                console.log("Sending updated educations to API:", educationsForAPI);
                // Call API to update database
                const response = await updateProfile({
                    body: { education: educationsForAPI },
                }).unwrap();
                console.log("Delete API response:", response);
                sonner_1.toast.success("Education deleted and saved to database!");
                // Handle editing state
                if (editingIndex === index) {
                    console.log("Was editing the deleted item, clearing form");
                    setEditingIndex(null);
                    setFormData({
                        degreeTitle: "",
                        major: "",
                        instituteName: "",
                        cgpa: "",
                        scale: "",
                        yearOfPassing: "",
                        duration: "",
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
                setEducations(educations);
                let errorMessage = "Failed to delete education from database";
                if ((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message) {
                    errorMessage = error.data.message;
                }
                sonner_1.toast.error(errorMessage);
            }
        }
    };
    // const handleDeleteEducation = (index: number) => {
    //   if (window.confirm("Are you sure you want to delete this education?")) {
    //     setEducations((prev) => prev.filter((_, i) => i !== index));
    //     toast.success("Education deleted successfully!");
    //     // If editing this item, cancel editing
    //     if (editingIndex === index) {
    //       setEditingIndex(null);
    //       setFormData({
    //         degreeTitle: "",
    //         major: "",
    //         instituteName: "",
    //         cgpa: "",
    //         scale: "",
    //         yearOfPassing: "",
    //         duration: "",
    //       });
    //     }
    //   }
    // };
    const handleSave = async () => {
        var _a;
        if (!isSaveEnabled()) {
            sonner_1.toast.error("Please add at least one education before saving");
            return;
        }
        try {
            console.log("Saving educations to database:", educations); // Debug log
            // Convert string values back to appropriate types for API
            const educationsForAPI = educations.map((edu) => ({
                degreeTitle: edu.degreeTitle,
                major: edu.major,
                instituteName: edu.instituteName,
                cgpa: parseFloat(edu.cgpa) || 0,
                scale: parseFloat(edu.scale) || 0,
                yearOfPassing: parseInt(edu.yearOfPassing) || 0,
                duration: edu.duration,
            }));
            console.log("Formatted educations for API:", educationsForAPI);
            const response = await updateProfile({
                body: { education: educationsForAPI },
            }).unwrap();
            sonner_1.toast.success("Education information saved successfully!");
            console.log("Education saved to database - API response:", response);
            // Force refetch to ensure we have the latest data
            const refreshedData = await refetch();
            console.log("Refreshed data after save:", refreshedData); // Debug log
        }
        catch (error) {
            sonner_1.toast.error(((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message) || "Failed to save education information");
            console.error("Save education error:", error);
        }
    };
    const handleCancelEdit = () => {
        setEditingIndex(null);
        setFormData({
            degreeTitle: "",
            major: "",
            instituteName: "",
            cgpa: "",
            scale: "",
            yearOfPassing: "",
            duration: "",
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-8", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-3xl font-semibold text-gray-900 mb-4", children: "Level of Education" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "degreeTitle", children: "Degree Title" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "degreeTitle", value: formData.degreeTitle, onChange: (e) => handleInputChange("degreeTitle", e.target.value), placeholder: "Bachelor of Computer Science", className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "major", children: "Major" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "major", value: formData.major, onChange: (e) => handleInputChange("major", e.target.value), placeholder: "BSc in CSE", className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "instituteName", children: "Institute Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "instituteName", value: formData.instituteName, onChange: (e) => handleInputChange("instituteName", e.target.value), placeholder: "X International University", className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "cgpa", children: "CGPA" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "cgpa", value: formData.cgpa, onChange: (e) => handleInputChange("cgpa", e.target.value), placeholder: "3.00", className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "scale", children: "Scale" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "scale", value: formData.scale, onChange: (e) => handleInputChange("scale", e.target.value), placeholder: "4", className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "yearOfPassing", children: "Year of Passing" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "yearOfPassing", value: formData.yearOfPassing, onChange: (e) => handleInputChange("yearOfPassing", e.target.value), placeholder: "2022", className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-lg font-medium text-gray-900", htmlFor: "duration", children: "Duration" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "duration", value: formData.duration, onChange: (e) => handleInputChange("duration", e.target.value), placeholder: "4 Years", className: "mt-1 p-4 rounded-lg !text-lg text-black w-full bg-gray-100" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleAddEducation, type: "button", disabled: !isFormValid(), className: `px-8 py-4 text-lg font-medium rounded-lg flex items-center gap-2 ${isFormValid()
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"}`, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }), editingIndex !== null ? "Update Education" : "Add Education"] }), editingIndex !== null && ((0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleCancelEdit, type: "button", className: "bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 text-lg font-medium rounded-lg", children: "Cancel Edit" })), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleSave, type: "button", disabled: !isSaveEnabled() || isLoading, className: `px-8 py-4 text-lg font-medium rounded-lg flex items-center gap-2 ${isSaveEnabled() && !isLoading
                            ? "bg-green-900 hover:bg-green-800 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"}`, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Save, { className: "h-4 w-4" }), isLoading ? "Saving..." : "Save All Education"] })] }), (educations.length > 0 || isUserLoading) && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-8", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-2xl font-semibold text-gray-900 mb-4", children: isUserLoading
                            ? "Loading education data..."
                            : `Added Education (${educations.length})` }), isUserLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center py-8", children: (0, jsx_runtime_1.jsx)("div", { className: "animate-spin h-8 w-8 border-2 border-green-600 border-t-transparent rounded-full" }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: educations.map((education, index) => ((0, jsx_runtime_1.jsx)("div", { className: `border rounded-lg p-6 bg-white shadow-sm ${editingIndex === index
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200"}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-start", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("h5", { className: "text-lg font-semibold text-gray-900", children: education.degreeTitle }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mb-2", children: education.major }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700 font-medium mb-1", children: education.instituteName }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600", children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "CGPA:" }), " ", education.cgpa, "/", education.scale] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Year:" }), " ", education.yearOfPassing] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Duration:" }), " ", education.duration] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 ml-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: () => handleEditEducation(index), size: "sm", variant: "outline", className: "p-2", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: () => handleDeleteEducation(index), size: "sm", variant: "outline", className: "p-2 text-red-600 hover:text-red-700 hover:bg-red-50", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4" }) })] })] }) }, `education-${index}`))) }))] }))] }));
}
