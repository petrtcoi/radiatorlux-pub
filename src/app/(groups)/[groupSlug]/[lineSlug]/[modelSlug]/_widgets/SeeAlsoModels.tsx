import { fetchAllData } from '@/entities'
import { cn } from '@/shared'
import Link from 'next/link'

type Props = {
	className?: string
	slugsString?: string
}

export async function SeeAlsoModels(props: Props) {
	const { slugsString = '', className = '' } = props
	const { models, lines } = await fetchAllData()

	const slugs = slugsString.split(',').filter(Boolean)

	const seeAlsoModels = models
		.filter(model => slugs.includes(model.slug))
		.map(model => {
			const line = lines.find(l => l.slug === model.lineSlug)
			if (!line) return null
			return {
				...model,
				groupSlug: line.groupSlug,
			}
		})
		.filter(Boolean)

	const total = seeAlsoModels.length

	if (total === 0) return null

	return (
		<div className={cn('flex flex-col gap-0', className)}>
			<div className='text-xs font-semibold tracking-tight'>смотрите также:</div>
			<div className='flex flex-col gap-2'>
				{seeAlsoModels.map((m, index) => {
					if (!m) return null // for TS
					return (
						<div
							key={m.slug}
							className='pl-3 flex flex-col gap-0'
						>
							<Link
								href={`/${m.groupSlug}/${m.lineSlug}/${m.slug}`}
								className='text-xs text-primary tracking-tight hover:underline'
							>
								{m.fullName}
							</Link>
							<div className='tracking-tight leading-none text-xs text-muted-foreground'>{m.shortDesc}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
