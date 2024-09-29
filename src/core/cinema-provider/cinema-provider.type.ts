export type TCinemaProvider = {
  id: string;
  name: string;
  logo_url: string;
  background_url: string;
  cinema_count: number;
  rating: {
    score: number;
    count: number;
  };
};