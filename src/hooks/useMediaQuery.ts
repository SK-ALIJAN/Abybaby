import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const getMatch = () =>
    window.matchMedia(query).matches;

  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== "undefined" ? getMatch() : false
  );

  useEffect(() => {
    const media = window.matchMedia(query);

    const handler = () => setMatches(media.matches);

    media.addEventListener("change", handler);

    return () =>
      media.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
