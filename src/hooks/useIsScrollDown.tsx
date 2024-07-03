import { useEffect, useRef, useState } from 'react';

import { getScrollTop } from '@/lib/utils';

export function useIsScrollDown() {
  const isScrollDown = useRef(false);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = (event: Event) => {
      const scrollTop = getScrollTop();
      isScrollDown.current = scrollTop - lastScrollTop > 0;
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return () => isScrollDown.current;
}
