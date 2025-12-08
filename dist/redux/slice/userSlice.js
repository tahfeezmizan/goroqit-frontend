"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// create slice to store data and remove data of user
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectIsLoggedIn = exports.selectUser = exports.removeUser = exports.setUser = exports.userSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const js_cookie_1 = __importDefault(require("js-cookie"));
const initialState = {
    user: null, // Default value
};
exports.userSlice = (0, toolkit_1.createSlice)({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            var _a;
            state.user = action.payload.data;
            console.log("Action Payload", action);
            // console.log("Redux",state.user);
            // const accessToken = action.payload.data.accessToken;
            const role = action.payload.data.token;
            console.log("redux slices", role);
            // Save accessToken to localStorage and cookies (client-side only)
            if (typeof window !== "undefined") {
                localStorage.setItem("accessToken", (_a = action.payload.data) === null || _a === void 0 ? void 0 : _a.accessToken);
                // Set the token in the 'user' cookie that middleware expects
                js_cookie_1.default.set("user", action.payload.data);
            }
        },
        removeUser: (state) => {
            state.user = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("email");
                js_cookie_1.default.remove("accessToken");
                js_cookie_1.default.remove("user");
            }
        },
    },
});
_a = exports.userSlice.actions, exports.setUser = _a.setUser, exports.removeUser = _a.removeUser;
const selectUser = (state) => state.user;
exports.selectUser = selectUser;
const selectIsLoggedIn = (state) => !!state.user.user;
exports.selectIsLoggedIn = selectIsLoggedIn;
exports.default = exports.userSlice.reducer;
