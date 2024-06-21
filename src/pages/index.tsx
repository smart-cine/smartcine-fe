import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar/home-navbar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import LocaleSwitcher from "@/components/other/LocaleSwitcher"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CheckList } from "@/components/pages/index/CheckList"
import { ConstrainedContainer } from "@/components/container/constrained-container"
import { HomeIcon } from "lucide-react"
import { CurrentShows } from "@/components/pages/index/CurrentShows"
import { useQueryFilm } from "@/core/film/film.query"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
	const { data: films } = useQueryFilm()
	console.log("films", films)

	return (
		<>
			{/* Home Navbar */}
			<Navbar className="sticky top-0 z-10">
				<Navbar.Item title="Movie schedule">
					<div className="flex flex-col mx-auto">
						<Link
							href="#"
							className={cn(
								navigationMenuTriggerStyle(),
								"w-full justify-start"
							)}
						>
							Currently showing movies
						</Link>
						<Link
							href="#"
							className={cn(
								navigationMenuTriggerStyle(),
								"w-full justify-start"
							)}
						>
							Upcoming movies
						</Link>
					</div>
				</Navbar.Item>
				<Navbar.Item title="Cinema">
					<div className="flex flex-col mx-auto">
						{["CGV", "BHD", "Galaxy", "Lotte", "MegaGS"].map((cinema) => (
							<Link
								key={cinema}
								href="#"
								className={cn(
									navigationMenuTriggerStyle(),
									"w-full justify-start"
								)}
							>
								{cinema}
							</Link>
						))}
					</div>
				</Navbar.Item>
				{/* <Navbar.Link href="#"></Navbar.Link> */}
				<Navbar.Link href="#">Top film</Navbar.Link>
				<Navbar.Item title="Blog">
					asdasd asdasd asdasd asdasd asdasd asdasd asdasd asdasd asdasd asdasd
					asdasd
				</Navbar.Item>
				<Navbar.Item title="Change language">
					<LocaleSwitcher />
				</Navbar.Item>
			</Navbar>

			{/* Breadcumb */}
			<ConstrainedContainer className="p-2 ml-2">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">
								<HomeIcon className="w-4 h-4"></HomeIcon>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/components">Cinema</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Movie schedule</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</ConstrainedContainer>

			{/* Movie schedule */}
			<ConstrainedContainer className="bg-[#FDF2F8] py-6">
				<CheckList>
					<CheckList.Item>
						Lịch chiếu luôn <b>cập nhật sớm nhất</b>
					</CheckList.Item>
					<CheckList.Item>Suất chiếu đầy đủ các rạp</CheckList.Item>
					<CheckList.Item>
						Đặt lịch chiếu <b>mua vé siêu nhanh</b>
					</CheckList.Item>
					<CheckList.Item>
						<p>Đặt vé lịch chiếu phim yêu thích mọi nơi</p>
					</CheckList.Item>
				</CheckList>
			</ConstrainedContainer>

			{/* Cinema near you */}
			<ConstrainedContainer className="py-6 ">
				<p className="text-[#b12572] font-bold text-2xl w-fit mx-auto">
					Find cinema near you
				</p>
				<div className="py-44 text-3xl w-fit mx-auto">COMING SOON!</div>
			</ConstrainedContainer>

			{/* Current shows */}
			<ConstrainedContainer className="py-6 bg-[url('/momo-showingmovies-bg.jpg')]">
				<p className="text-white font-bold text-2xl w-fit mx-auto">
					Current shows
				</p>
				<CurrentShows films={films ?? []} />
			</ConstrainedContainer>

			{/* Cinema system */}
			<ConstrainedContainer className="py-6 ">
				<p className="text-[#b12572] font-bold text-2xl w-fit mx-auto">
					Cinema system
				</p>
				<div className="py-44 text-3xl w-fit mx-auto">COMING SOON!</div>
			</ConstrainedContainer>

			{/* Blog */}
			<ConstrainedContainer className="py-6 ">
				<p className="text-[#b12572] font-bold text-2xl w-fit mx-auto">Blog</p>
				<div className="py-44 text-3xl w-fit mx-auto">COMING SOON!</div>
			</ConstrainedContainer>

			{/* News - Events */}
			<ConstrainedContainer className="py-6 ">
				<p className="text-[#b12572] font-bold text-2xl w-fit mx-auto">
					News - Events
				</p>
				<div className="py-44 text-3xl w-fit mx-auto">COMING SOON!</div>
			</ConstrainedContainer>

			{/* FAQ */}
			<ConstrainedContainer className="py-6">
				<p className="text-[#b12572] font-bold text-2xl w-fit mx-auto">FAQ</p>
				<div className="py-44 text-3xl w-fit mx-auto">COMING SOON!</div>
			</ConstrainedContainer>
		</>
	)
}
