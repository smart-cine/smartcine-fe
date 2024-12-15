export type TPickseat = {
  id: string;
  status: PickseatStatus;
};

export enum PickseatStatus {
  AVAILABLE = 'AVAILABLE',
  PENDING = 'PENDING',
  BOOKED = 'BOOKED',
}
