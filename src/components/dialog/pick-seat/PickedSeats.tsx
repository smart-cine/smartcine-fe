import { useMemo } from 'react';

import { useReadCinemaRoom } from '@/core/cinema-room/cinema-room.query';

import { usePickSeat } from './usePickSeat';

export function PickedSeats({
  cinema_room_id,
}: {
  readonly cinema_room_id: string;
}) {
  const { data: cinema_room } = useReadCinemaRoom(cinema_room_id);

  const seatIds = usePickSeat((state) =>
    Object.entries(state.seats)
      .filter(([_, value]) => value)
      .map(([key]) => key)
  );

  const seatCodes = useMemo(() => {
    if (!cinema_room) {
      return [];
    }

    return seatIds.map((seatId) => {
      const seat = cinema_room.layout?.seats.find((seat) => seat.id === seatId);
      return seat?.code ?? '';
    });
  }, [cinema_room, seatIds]);

  return (
    <div className='flex min-h-[50px] flex-row items-center gap-x-1'>
      <p className='whitespace-nowrap text-sm'>Chỗ ngồi</p>
      <div className='grow' />
      {seatCodes.length > 0 && (
        <div className='line-clamp-1 rounded-lg border border-gray-300 p-1'>
          {seatCodes.join(', ')}
        </div>
      )}
    </div>
  );
}
