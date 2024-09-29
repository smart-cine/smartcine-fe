import React, { useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

export function useShake() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [initTransform, setInitTransform] = React.useState<string>('');

  useEffect(() => {
    const itv = setInterval(() => {
      if (
        ref.current &&
        getComputedStyle(ref.current).transform !== initTransform
      ) {
        setInitTransform(getComputedStyle(ref.current).transform);
        console.log('initTransform', getComputedStyle(ref.current).transform);
      }
    }, 100);
    return () => {
      clearInterval(itv);
    };
  }, [initTransform]);

  const shake = useMemo(
    () =>
      debounce(
        (loop: number) => {
          if (ref.current) {
            const timeouts = [];
            for (let i = 0; i < loop; i++) {
              setTimeout(() => {
                console.log(
                  `${initTransform} translate(${i % 2 === 0 ? '-10px' : '10px'}, 0)`
                );
                ref.current?.style.setProperty(
                  'transform',
                  `${initTransform} translate(${i % 2 === 0 ? '-10px' : '10px'}, 0)`
                  // `${i % 2 === 0 ? '-10px' : '10px'}`
                  // getComputedStyle(ref.current).transform
                  // `${.split(' ')[0]} translateX(${i % 2 === 0 ? '-10px' : '10px'})`
                );
              }, 100 * i);
            }

            setTimeout(() => {
              // ref.current?.style.setProperty('left', '0px');
              ref.current?.style.setProperty('transform', initTransform);
            }, 100 * loop);
          }
        },
        100,
        {
          trailing: false,
          leading: true,
        }
      ),
    [initTransform]
  );

  return {
    ref,
    shake,
  };
}
