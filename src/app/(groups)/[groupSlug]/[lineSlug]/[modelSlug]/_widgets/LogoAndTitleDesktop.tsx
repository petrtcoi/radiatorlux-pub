/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { Paths } from '@/configs'
import { cn } from '@/shared'
import Link from 'next/link'

// ==========  Types =========================

type Props = {
	brandSlug: string
	brandLogoSrc: string
	modelTitle: string
	className?: string
}

// ==========  Components ====================

export function LogoAndTitleDesktop(props: Props) {
	const { brandSlug, brandLogoSrc, modelTitle, className = '' } = props

	return (
		<div className={cn('flex flex-row gap-0 lg:gap-8 items-stretch', className)}>
			<div>
				<Link
					href={`${Paths.brands.root}/${brandSlug}`}
					className='hover:opacity-75 hidden lg:block'
				>
					<img
						src={`/assets/brands/${brandLogoSrc}`}
						className='w-20 h-auto'
					/>
				</Link>
			</div>
			<h1 className='hidden md:flex items-center font-semibold tracking-tight text-sate-900 text-2xl  md:text-2xl'>
				{modelTitle}
			</h1>
		</div>
	)
}
