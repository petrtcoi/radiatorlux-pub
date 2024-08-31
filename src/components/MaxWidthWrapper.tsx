import { cn } from '@/shared'

export function MaxWidthWrapper(props: {
	className?: string
	children: React.ReactNode
}) {
	const { className, children } = props

	return (
		<div
			className={cn(
				'mx-auto flex flex-col w-full max-w-7xl px-4 md:px-20',
				className
			)}
		>
			{children}
		</div>
	)
}
