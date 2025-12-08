"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AllowContextMenu;
const react_1 = require("react");
/**
 * Attach a capturing `contextmenu` listener that stops propagation of any
 * earlier handlers which might call `preventDefault()` and thereby disable
 * the native browser context menu. This component does NOT call
 * `preventDefault()` itself — it only stops other handlers from running so
 * the native menu can appear.
 */
function AllowContextMenu() {
    (0, react_1.useEffect)(() => {
        function onContextMenuCapture(e) {
            // Stop other listeners from running (those may call preventDefault()).
            // Do NOT call e.preventDefault() here — we want the native menu.
            e.stopImmediatePropagation();
        }
        // Use capture phase so we run before non-capture handlers and can stop them.
        document.addEventListener("contextmenu", onContextMenuCapture, true);
        return () => {
            document.removeEventListener("contextmenu", onContextMenuCapture, true);
        };
    }, []);
    return null;
}
