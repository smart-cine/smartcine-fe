export function ListDate() {
  return (
    <div className='flex flex-row gap-x-2 px-5'>
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className='w-18 flex flex-col overflow-hidden rounded-sm border border-gray-400'
        >
          <div className='bg-gray-200 px-6 py-2 text-center font-semibold'>
            {24 + item}
          </div>
          <div className='p-1 text-center text-sm'>Thu 2</div>
        </div>
      ))}
    </div>
  );
}
