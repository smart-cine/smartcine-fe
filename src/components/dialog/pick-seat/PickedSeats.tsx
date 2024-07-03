import { usePickSeat } from './usePickSeat';

export function PickedSeats() {
  const seats = usePickSeat((state) =>
    Object.entries(state.seats)
      .filter(([_, value]) => value)
      .map(([key]) => key)
  );

  return (
    <div className='flex min-h-[50px] flex-row items-center'>
      <p className='text-sm'>Chỗ ngồi</p>
      <div className='grow' />
      {seats.length > 0 && (
        <div className='rounded-lg border border-gray-300 p-1'>
          {seats.join(', ')}
        </div>
      )}
    </div>
  );
}
