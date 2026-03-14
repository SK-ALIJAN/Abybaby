import { useCallback, useEffect, useRef, useState } from "react";

interface UseFetchOptions extends RequestInit {
    /**
     * Skip automatic fetching
     */
    skip?: boolean;
}

export function useFetch<T>(
    url: string,
    options?: UseFetchOptions
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const abortRef = useRef<AbortController | null>(
        null
    );

    // Stable options reference (avoid infinite rerender)
    const optionsRef = useRef(options);

    useEffect(() => {
        optionsRef.current = options;
    }, [options]);

    const fetchData = useCallback(async () => {
        if (optionsRef.current?.skip) return;

        abortRef.current?.abort();

        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                ...optionsRef.current,
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(
                    `Request failed: ${response.status}`
                );
            }

            const result = (await response.json()) as T;

            setData(result);
        } catch (err: any) {
            if (err.name !== "AbortError") {
                setError(err.message || "Fetch error");
            }
        } finally {
            setLoading(false);
        }
    }, [url]);

    // Auto fetch
    useEffect(() => {
        fetchData();

        return () => {
            abortRef.current?.abort();
        };
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
    };
}
