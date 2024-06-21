import { FilmDetail } from "./film.type"
import { genQueryCrud } from "@/lib/gen-query-crud"

export const {
	create: useCreateFilm,
	read: useQueryFilm,
	update: useUpdateFilm,
	delete: useDeleteFilm,
} = genQueryCrud<FilmDetail>("films")
