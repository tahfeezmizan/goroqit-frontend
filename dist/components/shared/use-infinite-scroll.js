"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInfiniteScroll = useInfiniteScroll;
const react_1 = require("react");
function useInfiniteScroll({ hasMore, isLoading, onLoadMore, threshold = 0.1, rootMargin = "100px", debounceMs = 150, }) {
    const sentinelRef = (0, react_1.useRef)(null);
    const containerRef = (0, react_1.useRef)(null);
    const [isNearTop, setIsNearTop] = (0, react_1.useState)(false);
    const [scrollState, setScrollState] = (0, react_1.useState)(null);
    const debounceTimerRef = (0, react_1.useRef)(null);
    const isLoadingRef = (0, react_1.useRef)(false);
    const lastLoadTimeRef = (0, react_1.useRef)(0);
    // Debounced load more function to prevent rapid API calls
    const debouncedLoadMore = (0, react_1.useCallback)(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
            const now = Date.now();
            const timeSinceLastLoad = now - lastLoadTimeRef.current;
            // Prevent rapid successive calls (minimum 500ms between calls)
            if (timeSinceLastLoad < 500) {
                return;
            }
            if (hasMore && !isLoading && !isLoadingRef.current) {
                isLoadingRef.current = true;
                lastLoadTimeRef.current = now;
                // Store current scroll state before loading
                const container = containerRef.current;
                if (container) {
                    setScrollState({
                        scrollTop: container.scrollTop,
                        scrollHeight: container.scrollHeight,
                    });
                }
                onLoadMore();
            }
        }, debounceMs);
    }, [hasMore, isLoading, onLoadMore, debounceMs]);
    // Intersection Observer for efficient scroll detection
    (0, react_1.useEffect)(() => {
        const sentinel = sentinelRef.current;
        const container = containerRef.current;
        if (!sentinel || !container)
            return;
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setIsNearTop(entry.isIntersecting);
            if (entry.isIntersecting && hasMore && !isLoading) {
                debouncedLoadMore();
            }
        }, {
            root: container,
            rootMargin,
            threshold,
        });
        observer.observe(sentinel);
        return () => {
            observer.disconnect();
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [hasMore, isLoading, debouncedLoadMore, threshold, rootMargin]);
    // Reset loading flag when loading state changes
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            isLoadingRef.current = false;
        }
    }, [isLoading]);
    // Maintain scroll position after loading new content
    const maintainScrollPosition = (0, react_1.useCallback)(() => {
        const container = containerRef.current;
        if (!container || !scrollState)
            return;
        requestAnimationFrame(() => {
            const newScrollHeight = container.scrollHeight;
            const heightDifference = newScrollHeight - scrollState.scrollHeight;
            if (heightDifference > 0) {
                container.scrollTop = scrollState.scrollTop + heightDifference;
            }
            setScrollState(null);
        });
    }, [scrollState]);
    // Smooth scroll to bottom function
    const scrollToBottom = (0, react_1.useCallback)((behavior = "smooth") => {
        const container = containerRef.current;
        if (!container)
            return;
        requestAnimationFrame(() => {
            container.scrollTo({
                top: container.scrollHeight,
                behavior,
            });
        });
    }, []);
    // Performance-optimized scroll position tracking
    (0, react_1.useEffect)(() => {
        const container = containerRef.current;
        if (!container)
            return;
        let rafId;
        let lastScrollTop = 0;
        const handleScroll = () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            rafId = requestAnimationFrame(() => {
                const currentScrollTop = container.scrollTop;
                // Only update if scroll position changed significantly
                if (Math.abs(currentScrollTop - lastScrollTop) > 10) {
                    lastScrollTop = currentScrollTop;
                    // Check if user is near the top for loading more
                    const isAtTop = currentScrollTop <= 100;
                    if (isAtTop !== isNearTop) {
                        setIsNearTop(isAtTop);
                    }
                }
            });
        };
        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            container.removeEventListener("scroll", handleScroll);
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [isNearTop]);
    return {
        sentinelRef,
        containerRef,
        isNearTop,
        scrollToBottom,
        maintainScrollPosition,
    };
}
exports.default = useInfiniteScroll;
