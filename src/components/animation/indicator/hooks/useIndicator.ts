import assert from 'assert';
import { useEffect, useRef } from 'react';

export function useIndicator<
  T extends HTMLElement,
  TChild extends HTMLElement = HTMLDivElement,
>(manual = false) {
  const parentRef = useRef<T>(null);
  const indicatorRef = useRef<TChild>(null);

  const handleMouseEnter = () => {
    console.log('Mouse enter');
  };

  const handleMouseLeave = () => {
    console.log('Mouse leave');
  };

  const isntall = () => {
    if (!parentRef.current) return;
    Array.from(parentRef.current.querySelectorAll('.indicator')).forEach(
      (indicator) => {
        assert(
          indicator instanceof HTMLElement,
          'indicator is not HTMLElement'
        );
        indicator.addEventListener('mouseenter', handleMouseEnter);
        indicator.addEventListener('mouseleave', handleMouseLeave);
      }
    );
  };

  const uninstall = () => {
    if (!parentRef.current) return;
    Array.from(parentRef.current.querySelectorAll('.indicator')).forEach(
      (indicator) => {
        assert(
          indicator instanceof HTMLElement,
          'indicator is not HTMLElement'
        );
        indicator.removeEventListener('mouseenter', handleMouseEnter);
        indicator.removeEventListener('mouseleave', handleMouseLeave);
      }
    );
  };

  useEffect(() => {
    if (!manual) isntall();

    return () => {
      uninstall();
    };
  }, []);

  return { parentRef, indicatorRef, isntall, uninstall };
}
