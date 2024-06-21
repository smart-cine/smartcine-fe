import { CheckCircleIcon } from "lucide-react"
import Image from "next/image"

export function CheckList({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-row flex-wrap justify-evenly gap-y-5">
			<div className="flex flex-col gap-y-2 justify-center grow">
				<p className="text-2xl font-bold text-[#b12572] mb-2">
					Movie schedule on SmartCine
				</p>
				{children}
			</div>
			<Image
				src="/momo-home-showtimes.jpg"
				alt="momo home showtimes"
				width={350}
				height={350}
				className="rounded-md grow"
			/>
		</div>
	)
}

CheckList.Item = CheckListItem
export function CheckListItem({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-row gap-x-1">
			<div className="flex flex-row items-center">
				<CheckCircleIcon className="w-5 h-5"></CheckCircleIcon>
			</div>
			<div className="flex flex-row items-center whitespace-pre-wrap">
				{children}
			</div>
		</div>
	)
}
