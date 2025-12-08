"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogoutUserMutation = exports.useLoginUserMutation = exports.useResendOTPMutation = exports.useForgetPasswordSendOTPMutation = exports.useVerifyUserMutation = exports.useCreateUserMutation = void 0;
const userSlice_1 = require("../slice/userSlice");
const baseApi_1 = require("./baseApi");
const authApi = baseApi_1.baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // create user
        createUser: builder.mutation({
            query: (data) => ({
                url: `/auth/signup`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        // login user
        loginUser: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        // verify user
        verifyUser: builder.mutation({
            query: (data) => ({
                url: "/auth/verify-account",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        // verify user
        resendOTP: builder.mutation({
            query: (data) => ({
                url: "/auth/resend-otp",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        // verify user
        forgetPasswordSendOTP: builder.mutation({
            query: (data) => ({
                url: "/auth/forget-password",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        // logout user
        logoutUser: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["Auth"],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Clear RTK Query cache
                    dispatch(baseApi_1.baseApi.util.resetApiState());
                    // Clear Redux user state
                    dispatch((0, userSlice_1.removeUser)()); // This will clear your user slice
                }
                catch (error) {
                    console.error("Logout failed:", error);
                }
            },
        }),
    }),
});
exports.useCreateUserMutation = authApi.useCreateUserMutation, exports.useVerifyUserMutation = authApi.useVerifyUserMutation, exports.useForgetPasswordSendOTPMutation = authApi.useForgetPasswordSendOTPMutation, exports.useResendOTPMutation = authApi.useResendOTPMutation, exports.useLoginUserMutation = authApi.useLoginUserMutation, exports.useLogoutUserMutation = authApi.useLogoutUserMutation;
