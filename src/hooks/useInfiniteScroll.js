import { useEffect, useRef } from "react";

export const useInfiniteScroll = ({ enabled = true, hasMore, onLoadMore }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!enabled || !observerRef.current || !hasMore) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { rootMargin: "280px" },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [enabled, hasMore, onLoadMore]);

  return observerRef;
};
