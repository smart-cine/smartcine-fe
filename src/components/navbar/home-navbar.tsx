import type React from "react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function Navbar({
	className,
	children,
}: {
	readonly className?: string
	readonly children?: React.ReactNode
}) {
	return (
		<div
			className={cn(
				"border-b-[2px] shadow-sm flex flex-row justify-center mx-auto px-16 sm:px-6 lg:px-[20%] py-2 bg-white",
				className
			)}
		>
			<div className="grow" />
			<div className="flex flex-row">
				<NavigationMenu>
					<NavigationMenuList>{children}</NavigationMenuList>
				</NavigationMenu>
			</div>
		</div>
	)
}

Navbar.Link = NavBarLink
export function NavBarLink({
	children,
	href,
}: {
	readonly children: React.ReactNode
	readonly href: string
}) {
	return (
		<NavigationMenuItem>
			<NavigationMenuLink href={href} className={navigationMenuTriggerStyle()}>
				{children}
			</NavigationMenuLink>
		</NavigationMenuItem>
	)
}

Navbar.Item = NavbarItem
export function NavbarItem({
	children,
	title,
	className,
}: {
	readonly children: React.ReactNode
	readonly title: string
	readonly className?: string
}) {
	const ref = useRef<HTMLButtonElement>(null)
	const [offsetLeft, setOffsetLeft] = useState(0)
	useEffect(() => {
		setInterval(() => {
			if (ref.current) {
				setOffsetLeft(ref.current.offsetLeft)
			}
		})
	})
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger ref={ref}>{title}</NavigationMenuTrigger>
			<NavigationMenuContent className={cn("p-4 min-w-[540px]", className)}>
				{children}
			</NavigationMenuContent>
		</NavigationMenuItem>
	)
}
