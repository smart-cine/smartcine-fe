export type TFilm = {
  id: string;
  title: string;
  director: string;
  description: string;
  picture_url?: string;
  trailer_url?: string;
  release_date: Date;
  language: string;
  restrict_age: number;
  duration: number;
  country: string;

  tags: string[];
};
