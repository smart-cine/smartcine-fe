export type TFilm = {
  id: string;
  cinema_provider_id: string;
  tags: string[];
  title: string;
  director: string;
  description: string;
  release_date: Date;
  country: string;
  restrict_age: number;
  duration: number;
  picture_url?: string;
  trailer_url?: string;
  language: string;
  rating: {
    score: number;
    count: number;
  };
};
