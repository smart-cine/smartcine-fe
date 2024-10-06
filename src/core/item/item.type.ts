export type TItem = {
  id: string;

  name: string;
  price: string;
  discount: number;
  image_url: string;
  items: TItem[];
};
