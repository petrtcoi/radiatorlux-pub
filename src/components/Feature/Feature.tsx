import { cn } from '@/shared'
import Link from 'next/link'

type Props = {
	title: string
	value: string
	highlighted?: boolean
	itemProp?: string
	link?: string
	valueStyles?: string
}

export function Feature(props: Props) {
	const { title, value, highlighted = false, itemProp, link, valueStyles = '' } = props

	return (
		<div className='flex justify-between text-xs items-baseline'>
			<div>{title}</div>
			<div
				className={'relative top-[2px] flex-grow border-dotted border-b-[1px] border-slate-200'}
				itemProp={itemProp}
			/>
			{link ? (
				<Link href={link}>
					<div
						className={cn('text-primary hover:opacity-75', {
							'font-bold': true,
						})}
					>
						{value}
					</div>
				</Link>
			) : (
				<div className={cn(valueStyles, { 'font-bold': highlighted })}>{value}</div>
			)}
		</div>
	)
}
