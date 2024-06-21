import { cn, genericMemo } from "@/lib/utils"

export const ConstrainedContainer = genericMemo(function ConstrainedContainer({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<div className={cn("w-full px-4 sm:px-6 lg:px-8", className)}>
			<div className="mx-auto max-w-3xl">{children}</div>
		</div>
	)
})
