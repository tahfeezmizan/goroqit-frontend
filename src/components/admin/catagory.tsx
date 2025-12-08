"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/redux/features/categoryApi";
import Swal from "sweetalert2";
import LoadingSpinner from "@/lib/loading-spinner";

export default function CategoryPage() {
  const [categoryName, setCategoryName] = useState("");
  const [open, setOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );

  // RTK Query hooks
  const { data, isLoading, refetch } = useGetCategoryQuery({
    page: 1,
    limit: 10,
  });
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = data?.data.data ?? [];

  const handleSaveCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      if (editingCategoryId) {
        // Update existing
        await updateCategory({
          id: editingCategoryId,
          data: { name: categoryName },
        }).unwrap();
      } else {
        // Create new
        await createCategory({ name: categoryName }).unwrap();
      }
      setCategoryName("");
      setEditingCategoryId(null);
      setOpen(false);
      refetch(); // refresh list
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleEdit = (category: { _id: string; name: string }) => {
    setEditingCategoryId(category._id);
    setCategoryName(category.name);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
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
        Swal.fire("Deleted!", "Category has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete category.", "error");
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <div className="space-y-8">
        {/* Add / Edit Category */}
        <div className="flex justify-between items-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-fit bg-transparent shadow-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                {editingCategoryId ? "Edit Category" : "Add New Category"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingCategoryId ? "Edit Category" : "Add New Category"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Category Name</label>
                  <Input
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                    setEditingCategoryId(null);
                    setCategoryName("");
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveCategory}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="border p-2 py-1 rounded-lg font-medium">
            Total Category: {categories.length}
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    SL NO
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center">
                      <LoadingSpinner />
                    </td>
                  </tr>
                ) : (
                  categories.map((category, index) => (
                    <tr key={category._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={category.status ? "default" : "secondary"}
                          className={
                            category.status
                              ? "bg-green-500 hover:bg-green-600"
                              : ""
                          }
                        >
                          {category.status ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(category)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(category._id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
