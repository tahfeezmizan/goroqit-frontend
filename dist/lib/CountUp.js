"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CountUp;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function CountUp({ end, duration = 1000 }) {
    const [count, setCount] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        let start = null;
        const step = (timestamp) => {
            if (!start)
                start = timestamp;
            const progress = timestamp - start;
            const progressRatio = Math.min(progress / duration, 1);
            setCount(Math.floor(progressRatio * end));
            if (progress < duration) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }, [end, duration]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: count.toLocaleString() });
}
