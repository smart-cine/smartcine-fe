import { Card, CardContent } from "@/components/ui/card"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel"
import { FilmDetail } from "@/core/film/film.type"
import { cn } from "@/lib/utils"

export function CurrentShows({
	films,
	className,
}: {
	readonly films: FilmDetail[]
	readonly className?: string
}) {
	return (
		<div className="flex flex-col gap-y-6 py-6 bg-black">
			<div className="flex flex-col items-center justify-between px-6 gap-y-3">
				<h1 className="text-2xl font-bold">Phim đang chiếu</h1>
				<Carousel
					className={cn("w-full max-w-6xl", className)}
					opts={{ loop: false, dragFree: true }}
				>
					<CarouselContent>
						{films.map((film, index) => (
							<CarouselItem key={film.id} className="basis-1/3">
								<div className="p-1">
									<Card>
										<CardContent className="flex aspect-square items-center justify-center p-6">
											{/* <PosterFilm data={film} /> */}
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
			<div className="flex flex-row gap-x-6 overflow-x-auto" />
		</div>
	)
}
