export type TCinemaRoom = {
  id: string;
  type: ECinemaRoomType;
  name: string;
};

export enum ECinemaRoomType {
  NORMAL,
  VIP,
  DELUXE,
}
