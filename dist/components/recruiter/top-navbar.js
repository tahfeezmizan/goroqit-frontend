"use strict";
"use client";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopNavbar = TopNavbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const userApi_1 = require("@/redux/features/userApi");
const image_1 = __importDefault(require("next/image"));
const page_loading_1 = require("../shared/page-loading");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
function TopNavbar() {
  var _a, _b, _c;
  const { data, isLoading } = (0, userApi_1.useGetMeQuery)(undefined);

  if (isLoading) {
    return (0, jsx_runtime_1.jsx)(page_loading_1.PageLoading, {});
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className: " h-16 bg-white border-b border-gray-200 z-30",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "flex items-center justify-between h-full px-6",
      children: [
        (0, jsx_runtime_1.jsxs)("h1", {
          className: "text-2xl font-bold text-gray-900 capitalize",
          children: [
            data === null || data === void 0 ? void 0 : data.role,
            " Panel",
          ],
        }),
        (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenu, {
          children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "ghost",
            className:
              "flex items-center gap-3 hover:bg-gray-50 px-3 py-2 h-auto",
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className: "w-10 h-10 rounded-full overflow-hidden border-2",
                children:
                  ((_b =
                    data === null || data === void 0
                      ? void 0
                      : data.profile) === null || _b === void 0
                    ? void 0
                    : _b.companyLogo) ||
                  (data === null || data === void 0 ? void 0 : data.image)
                    ? (0, jsx_runtime_1.jsx)(image_1.default, {
                        width: 1000,
                        height: 1000,
                        src: (0, utils_1.getImageUrl)(
                          ((_c =
                            data === null || data === void 0
                              ? void 0
                              : data.profile) === null || _c === void 0
                            ? void 0
                            : _c.companyLogo) ||
                            (data === null || data === void 0
                              ? void 0
                              : data.image)
                        ),
                        alt:
                          data === null || data === void 0 ? void 0 : data.name,
                        className: "w-full h-full object-cover",
                      })
                    : (0, jsx_runtime_1.jsx)(lucide_react_1.CircleUserRound, {
                        className: "size-9",
                      }),
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex flex-col text-start",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className:
                      " !text-lg font-semibold text-gray-900 leading-none",
                    children:
                      data === null || data === void 0 ? void 0 : data.name,
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "font-semibold text-gray-900",
                    children:
                      data === null || data === void 0 ? void 0 : data.role,
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
