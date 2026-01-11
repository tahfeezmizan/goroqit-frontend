"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetNewslettersQuery } from "@/redux/features/newsletterApi";
export type Newsletter = {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function NewsletterPage() {
  const { data, isLoading, isError } = useGetNewslettersQuery(undefined);

  if (isLoading) return <p>Loading newsletters...</p>;
  if (isError) return <p>Failed to load newsletters</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Newsletter Subscribers</h2>

      <div className="bg-white rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                #
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Email
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Created At
              </th>
              <th className="text-left py-4 px-6 font-semibold text-gray-700">
                Updated At
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.newsletters?.map((item: Newsletter, index: number) => (
              <tr
                key={item._id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 text-gray-700">{index + 1}</td>
                <td className="py-4 px-6 text-gray-700">{item.email}</td>
                <td className="py-4 px-6 text-gray-700">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 text-gray-700">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
