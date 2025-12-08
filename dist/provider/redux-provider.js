"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReduxProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const store_1 = require("@/redux/store");
const react_redux_1 = require("react-redux");
function ReduxProvider({ children, }) {
    return (0, jsx_runtime_1.jsx)(react_redux_1.Provider, { store: store_1.store, children: children });
}
