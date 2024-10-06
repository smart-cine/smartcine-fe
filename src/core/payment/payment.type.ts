export type TPayment = {
  id: string;
  perform_id: string;
  item_id: string;
  date_created: Date;
  date_expired: Date;
  // status: EPaymentStatus;
};

export enum TWalletType {
  VNPAY = 'VNPAY',
  MOMO = 'MOMO',
  ZALOPAY = 'ZALOPAY',
}
