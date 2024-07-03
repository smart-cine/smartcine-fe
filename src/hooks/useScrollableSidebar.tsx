import { useEffect, useRef } from 'react';

import { clamp, getScrollTop } from '@/lib/utils';

import { useIsScrollDown } from './useIsScrollDown';

export function useScrollableSidebar({
  marginTop = 0,
  marginBottom = 0,
}: {
  readonly marginTop?: number;
  readonly marginBottom?: number;
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const refParent = useRef<HTMLDivElement>(null);
  const checkScrollDown = useIsScrollDown();

  useEffect(() => {
    if (!ref.current || !refParent.current) return;

    const getBounds = () => {
      const bound = ref.current!.getBoundingClientRect();
      const parentBound = refParent.current!.getBoundingClientRect();
      return { bound, parentBound };
    };

    let relativeSidebarTop =
      getBounds().bound.top - getBounds().parentBound.top; // get initial sidebar top

    const translateSidebarY = (value: number) => {
      if (ref.current) {
        const { bound, parentBound } = getBounds();
        ref.current.style.transform = `translateY(${clamp(value, 0, parentBound.height - bound.height)}px)`;
      }
    };

    translateSidebarY(relativeSidebarTop);

    const handleScroll = () => {
      const isScrollDown = checkScrollDown();
      const scrollTop = getScrollTop();
      const { bound, parentBound } = getBounds();
      const initialSidebarTop = parentBound.top + scrollTop;
      const sidebarTop = bound.top + scrollTop;
      const viewportHeight = window.innerHeight;
      const contentHeight = bound.height;

      if (
        scrollTop + viewportHeight >=
          sidebarTop + contentHeight + marginBottom &&
        isScrollDown
      ) {
        relativeSidebarTop =
          scrollTop +
          viewportHeight -
          (initialSidebarTop + contentHeight) -
          marginBottom;
      }

      if (scrollTop < sidebarTop - marginTop + 20 && !isScrollDown) {
        relativeSidebarTop = scrollTop - initialSidebarTop + marginTop;
      }

      translateSidebarY(relativeSidebarTop);
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [checkScrollDown, marginBottom, marginTop]);

  return { ref, refParent };
}
