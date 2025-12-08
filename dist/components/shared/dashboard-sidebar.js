"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardSidebar = DashboardSidebar;
const jsx_runtime_1 = require("react/jsx-runtime");
const white_logo_png_1 = __importDefault(require("@/assets/white-logo.png"));
const utils_1 = require("@/lib/utils");
const userSlice_1 = require("@/redux/slice/userSlice");
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_redux_1 = require("react-redux");
const button_1 = require("../ui/button");
function DashboardSidebar({ sidebarItems, }) {
    // const [user, setUser] = useState(true);
    const dispatch = (0, react_redux_1.useDispatch)();
    const pathname = (0, navigation_1.usePathname)();
    const router = (0, navigation_1.useRouter)();
    // const { data: userData } = useGetMeQuery({});
    // console.log("User data", userData);
    const handleLogout = () => {
        dispatch((0, userSlice_1.removeUser)());
        router.push("/");
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-dvh bg-slate-800 text-white z-40 flex flex-col justify-between pb-20", children: [(0, jsx_runtime_1.jsxs)("div", { className: "", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-3 p-6 border-b border-slate-700", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: white_logo_png_1.default, alt: "Logo", width: 165, height: 40, className: "w-40 h-11" }) }) }), (0, jsx_runtime_1.jsx)("nav", { className: "py-4 space-y-2 ", children: sidebarItems.map((item) => {
                            const isActive = pathname === item.href;
                            return ((0, jsx_runtime_1.jsxs)(link_1.default, { href: item.href, className: (0, utils_1.cn)("flex items-center gap-3 px-4 py-3   transition-all duration-200 group", isActive
                                    ? "bg-emerald-600 border-l-4 text-white"
                                    : "text-gray-300 hover:bg-slate-700 hover:text-white"), children: [(0, jsx_runtime_1.jsx)(item.icon, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: item.label })] }, item.href));
                        }) })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleLogout, variant: "ghost", className: "text-lg !pl-5 flex items-center justify-start hover:bg-green-700 hover:text-white rounded-none", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { children: "Logout" })] })] }));
}
