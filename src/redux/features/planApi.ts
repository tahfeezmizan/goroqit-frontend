/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

// Type for a single Plan
export type PlanData = {
  _id: string;
  title: string;
  description: string; // make required since backend validates it
  price: number;
  duration: "1 month" | "3 months" | "6 months" | "1 year";
  paymentType: "Monthly" | "Yearly"; // required
  features: string[];
  status: "Active" | "Inactive";
  productId?: string;
  paymentLink?: string;
  priceId?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Type for API response for getPlans
export type PlanResponse = {
  plans: PlanData[];
  meta: {
    activeSubscriptions: number;
    expiredSubscriptions: number;
    failedSubscriptions: number;
  };
};

export const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all plans
    getPlans: builder.query<PlanResponse, void>({
      query: () => ({ url: "/plan", method: "GET" }),
      providesTags: ["Plan"],
      transformResponse: (response: any) => response?.data ?? [],
    }),

    // GET plan by ID
    getPlanById: builder.query<PlanData, string>({
      query: (id) => ({
        url: `/plan/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response?.data,
      providesTags: ["Plan"],
    }),

    // POST create plan
    createPlan: builder.mutation<PlanData, Omit<PlanData, "_id">>({
      query: (body) => ({
        url: "/plan",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Plan"],
    }),

    createCheckoutSession: builder.mutation({
      query: (id: string) => ({
        url: `/plan/create-checkout-session/${id}`,
        method: "POST",
        // Add headers to ensure JSON response
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      // Force JSON parsing
      transformResponse: (response: any) => {
        // If it's already parsed, return it
        if (typeof response === "object") return response;

        // If it's a string, try to parse it as JSON
        if (typeof response === "string") {
          try {
            return JSON.parse(response);
          } catch (e) {
            console.error("Failed to parse response as JSON:", response);
            throw e;
          }
        }

        return response;
      },
    }),

    // PATCH update plan
    updatePlan: builder.mutation<
      PlanData,
      { id: string; data: Partial<PlanData> }
    >({
      query: ({ id, data }) => ({
        url: `/plan/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Plan"],
    }),

    // DELETE plan
    deletePlan: builder.mutation<void, string>({
      query: (id) => ({
        url: `/plan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Plan"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPlansQuery,
  useGetPlanByIdQuery,
  useCreatePlanMutation,
  useCreateCheckoutSessionMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = planApi;
