export type ListFilm = FilmDetail[];

export type FilmDetail = {
  id: string;
  title: string;
  director: string;
  country: string;
  tags: Tag[];
  duration: string;
  release_date: string;
  restrict_age: number;
  // Picture_url: string;
  picture_url?: string;
  trailer_url?: string;
  // Trailer_url: string;
  description?: string;
};

export type Tag = {
  id: string;
  name: string;
};
