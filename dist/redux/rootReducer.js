"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootReducer = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const baseApi_1 = require("./features/baseApi");
const userSlice_1 = __importDefault(require("./slice/userSlice"));
// Combine all reducers
exports.rootReducer = (0, toolkit_1.combineReducers)({
    user: userSlice_1.default,
    [baseApi_1.baseApi.reducerPath]: baseApi_1.baseApi.reducer,
});
