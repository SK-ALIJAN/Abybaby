import { useEffect, useRef, useState } from "react";

/**
 * Debounce a value
 * @param value - Any changing value
 * @param delay - Delay in ms
 */
export function useDebounce<T>(
    value: T,
    delay: number
): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // Clear previous timer
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timer
        timeoutRef.current = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup on unmount / change
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [value, delay]);

    return debouncedValue;
}
