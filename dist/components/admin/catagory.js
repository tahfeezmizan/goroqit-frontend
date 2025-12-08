"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CategoryPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const badge_1 = require("@/components/ui/badge");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const dialog_1 = require("@/components/ui/dialog");
const lucide_react_1 = require("lucide-react");
const categoryApi_1 = require("@/redux/features/categoryApi");
const sweetalert2_1 = __importDefault(require("sweetalert2"));
function CategoryPage() {
    var _a;
    const [categoryName, setCategoryName] = (0, react_1.useState)("");
    const [open, setOpen] = (0, react_1.useState)(false);
    const [editingCategoryId, setEditingCategoryId] = (0, react_1.useState)(null);
    // RTK Query hooks
    const { data, isLoading, refetch } = (0, categoryApi_1.useGetCategoryQuery)({ page: 1, limit: 10 });
    const [createCategory] = (0, categoryApi_1.useCreateCategoryMutation)();
    const [updateCategory] = (0, categoryApi_1.useUpdateCategoryMutation)();
    const [deleteCategory] = (0, categoryApi_1.useDeleteCategoryMutation)();
    const categories = (_a = data === null || data === void 0 ? void 0 : data.data.data) !== null && _a !== void 0 ? _a : [];
    const handleSaveCategory = async () => {
        if (!categoryName.trim())
            return;
        try {
            if (editingCategoryId) {
                // Update existing
                await updateCategory({ id: editingCategoryId, data: { name: categoryName } }).unwrap();
            }
            else {
                // Create new
                await createCategory({ name: categoryName }).unwrap();
            }
            setCategoryName("");
            setEditingCategoryId(null);
            setOpen(false);
            refetch(); // refresh list
        }
        catch (error) {
            console.error("Error saving category:", error);
        }
    };
    const handleEdit = (category) => {
        setEditingCategoryId(category._id);
        setCategoryName(category.name);
        setOpen(true);
    };
    const handleDelete = async (id) => {
        const result = await sweetalert2_1.default.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#C9A94D",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });
        if (result.isConfirmed) {
            try {
                await deleteCategory(id).unwrap();
                refetch();
                sweetalert2_1.default.fire("Deleted!", "Category has been deleted.", "success");
            }
            catch (error) {
                sweetalert2_1.default.fire("Error!", "Failed to delete category.", "error");
                console.error("Error deleting category:", error);
            }
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "rounded-lg bg-gray-50 p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { open: open, onOpenChange: setOpen, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "w-fit bg-transparent shadow-none", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "w-4 h-4 mr-2" }), editingCategoryId ? "Edit Category" : "Add New Category"] }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "sm:max-w-md", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: editingCategoryId ? "Edit Category" : "Add New Category" }) }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "text-sm font-medium", children: "Category Name" }), (0, jsx_runtime_1.jsx)(input_1.Input, { value: categoryName, onChange: (e) => setCategoryName(e.target.value), placeholder: "Enter category name" })] }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, { children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: () => {
                                                        setOpen(false);
                                                        setEditingCategoryId(null);
                                                        setCategoryName("");
                                                    }, children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleSaveCategory, children: "Save" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border p-2 py-1 rounded-lg font-medium", children: ["Total Category: ", categories.length] })] }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-gray-100 border-b", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-sm font-medium text-gray-900", children: "SL NO" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-sm font-medium text-gray-900", children: "Category Name" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-sm font-medium text-gray-900", children: "Status" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-sm font-medium text-gray-900", children: "Action" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "divide-y divide-gray-200", children: isLoading ? ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: 4, className: "px-6 py-4 text-center", children: "Loading..." }) })) : (categories.map((category, index) => ((0, jsx_runtime_1.jsxs)("tr", { className: "hover:bg-gray-50", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 text-sm text-gray-900", children: String(index + 1).padStart(2, "0") }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 text-sm text-gray-900", children: category.name }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: category.status ? "default" : "secondary", className: category.status ? "bg-green-500 hover:bg-green-600" : "", children: category.status ? "Active" : "Inactive" }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.MoreVertical, { className: "w-4 h-4" }) }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { align: "end", children: [(0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { onClick: () => handleEdit(category), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "w-4 h-4 mr-2" }), "Edit"] }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { className: "text-red-600", onClick: () => handleDelete(category._id), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "w-4 h-4 mr-2" }), "Delete"] })] })] }) })] }, category._id)))) })] }) }) })] }) }));
}
