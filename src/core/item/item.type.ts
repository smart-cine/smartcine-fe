export type TItem = {
  id: string;

  item_name: string;
  amount: number;
  discount: number;
  items: TItem[];
};
