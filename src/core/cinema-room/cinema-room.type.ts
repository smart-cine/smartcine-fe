export type TCinemaRoom = {
  id: string;
  cinema_id: string;
  name: string;
  layout?: {
    rows: number;
    columns: number;
    seats: TCinemaRoomSeat[];
    groups: TCinemaRoomGroup[];
  };
};

export type TCinemaRoomSeat = {
  id: string;
  group_id: string;
  code: string;
  x: number;
  y: number;
};

export type TCinemaRoomGroup = {
  id: string;
  name: string;
  color: string;
  price: string;
};
