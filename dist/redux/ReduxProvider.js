"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const page_loading_1 = require("@/components/shared/page-loading");
const store_1 = require("@/redux/store");
const react_redux_1 = require("react-redux");
const react_1 = require("redux-persist/integration/react");
const ReduxProvider = ({ children }) => {
    return ((0, jsx_runtime_1.jsx)(react_redux_1.Provider, { store: store_1.store, children: (0, jsx_runtime_1.jsx)(react_1.PersistGate, { loading: (0, jsx_runtime_1.jsx)(page_loading_1.PageLoading, {}), persistor: store_1.persistor, children: children }) }));
};
exports.default = ReduxProvider;
