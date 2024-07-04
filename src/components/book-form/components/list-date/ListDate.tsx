import { useRef } from 'react';

import { DatePicker } from './DatePicker';

export function ListDate() {
  const dateNow = useRef(new Date());

  return (
    <div className='flex flex-row gap-x-2 overflow-auto px-5 py-2'>
      {Array.from({ length: 14 }).map((_, index) => (
        <DatePicker
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          index={index}
          time={new Date(dateNow.current.getTime() + 86400000 * index)}
        />
      ))}
    </div>
  );
}
