export type ListFilm = FilmDetail[]

export type FilmDetail = {
	id: string
	title: string
	director: string
	country: string
	tags: Tag[]
	duration: string
	release_date: string
	restrict_age: number
	// picture_url: string;
	picture_url?: string
	trailer_url?: string
	// trailer_url: string;
	description?: string
}

export type Tag = {
	id: string
	name: string
}
