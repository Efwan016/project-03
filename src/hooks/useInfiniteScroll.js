import { useEffect, useRef } from 'react';

export function useInfiniteScroll(callback, canLoadMore = true, rootMargin = '400px') {
  const ref = useRef(null);

  useEffect(() => {
    if (!canLoadMore) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) callback?.();
    }, { root: null, rootMargin });

    io.observe(el);
    return () => io.disconnect();
  }, [callback, canLoadMore, rootMargin]);

  return ref;
}
