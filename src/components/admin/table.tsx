/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export type Column<T> = {
    key: keyof T & string; // string-only keys to fix TS error
    label: string;
};

export type PaginationProps = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export type TableProps<T> = {
    data: T[];
    columns: Column<T>[];
    pagination?: PaginationProps;
};

export default function AdminTable<T extends { [key: string]: any }>({ data, columns, pagination }: TableProps<T>) {
    return (
        <div>
            <div className="bg-white rounded-lg overflow-hidden overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            {columns.map((col) => (
                                <th key={col.key} className="text-left py-4 px-6 font-semibold text-gray-700">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                {columns.map((col) => (
                                    <td key={col.key} className="py-4 px-6 text-gray-700">
                                        {row[col.key] ?? "-"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-end items-center gap-2 p-4">
                    <button className="p-1 rounded-full border text-gray-600 hover:bg-gray-100 disabled:opacity-50" onClick={() => pagination.onPageChange(Math.max(pagination.page - 1, 1))} disabled={pagination.page === 1}>
                        <ChevronLeft />
                    </button>

                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button key={page} onClick={() => pagination.onPageChange(page)} className={`px-3 py-1 rounded-full ${pagination.page === page ? "bg-green-900 text-white font-semibold" : "text-gray-600 hover:bg-gray-100"}`}>
                            {page}
                        </button>
                    ))}

                    <button className="p-1 rounded-full border text-gray-600 hover:bg-gray-100 disabled:opacity-50" onClick={() => pagination.onPageChange(Math.min(pagination.page + 1, pagination.totalPages))} disabled={pagination.page === pagination.totalPages}>
                        <ChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
}
