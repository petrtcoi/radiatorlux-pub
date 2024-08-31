'use client'

import { RangeSlider } from '@/components'
import { Button } from '@/components/ui/button'
import { cn } from '@/shared'
import { SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { getFilterLink } from './utils'

// ============================================================================

export type FiltersBlockData = {
	[id: string]: {
		title: string
		min: number
		max: number
		unit: string
		initValues: [number, number]
	}
}
export type FilterBlockValues = { [id: string]: [number, number] }

// ============================================================================

export function FiltersBlock(props: {
	filtersData: FiltersBlockData
	searchParams: any
	pathname: string
}) {
	const { filtersData, pathname, searchParams } = props
	const filtersRef = useRef<HTMLDivElement>(null)

	const defaultValues = Object.entries(filtersData).reduce<FilterBlockValues>(
		(acc, [id, filter]) => {
			acc[id] = filter.initValues
			return acc
		},
		{}
	)

	const [values, setValues] = useState<FilterBlockValues>(defaultValues)
	const resetFilters = () =>
		setValues(
			Object.entries(values).reduce<FilterBlockValues>((acc, [id, filter]) => {
				acc[id] = [filtersData[id].min, filtersData[id].max]
				return acc
			}, {})
		)

	const applyFilters = () => {
		setShowMobileFilters(false)
		if (filtersRef.current) {
			filtersRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	}

	const filterLink = getFilterLink({
		pathname,
		searchParams,
		filtersData: values,
	})

	const [showMobileFilters, setShowMobileFilters] = useState(false)
	const mobileFilterText = showMobileFilters
		? 'скрыть фильтры'
		: 'изменить фильтры'

	return (
		<div
			ref={filtersRef}
			className='flex flex-col w-full mt-[-30px] pt-[30px] sticky top-0 z-10'
		>
			{/* Small screen display values */}
			<div
				className={cn('md:hidden border-b-[1px] border-b-primary pb-6 mb-6', {
					['mb-12']: showMobileFilters,
				})}
			>
				<div
					className='flex flex-row justify-start gap-4 text-primary cursor-pointer hover:opacity-75'
					onClick={() => setShowMobileFilters(prev => !prev)}
				>
					<SlidersHorizontal />
					{mobileFilterText}
				</div>
				{!showMobileFilters && (
					<div className='mt-6 grid grid-cols-3'>
						{Object.entries(values).map(([id, value]) => {
							const filter = filtersData[id]
							const noVariants = filter.min === filter.max

							return (
								<div
									key={id}
									className='flex flex-col'
								>
									<div className='text-sm font-semibold tracking-tight'>
										{filter.title}
									</div>
									<div className='mt-1 text-sm text-muted-foreground tracking-tight'>
										{noVariants ? (
											<>
												{value[1]} {filter.unit}
											</>
										) : (
											<>
												{value[0]} - {value[1]} {filter.unit}
											</>
										)}
									</div>
								</div>
							)
						})}
					</div>
				)}
			</div>
			<div
				className={cn(
					' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-8 justify-start items-start ',
					{ ['hidden md:grid']: !showMobileFilters }
				)}
			>
				{Object.entries(filtersData).map(([id, filter]) => (
					<RangeSlider
						key={id}
						title={filter.title}
						min={filter.min}
						max={filter.max}
						unit={filter.unit}
						values={values[id]}
						setValues={v => setValues({ ...values, [id]: v })}
					/>
				))}
			</div>
			{/* Buttons */}
			<div
				className={cn(
					'pb-2 mb-4 mt-20 md:mt-14 flex flex-col gap-8 md:gap-5 border-b-[1px] border-slate-600 md:border-none',
					{ ['hidden md:flex']: !showMobileFilters }
				)}
			>
				<Link
					href={`${filterLink}#list`}
					scroll={true}
				>
					<Button
						className='w-full'
						size={'lg'}
						color={'primary'}
						onClick={applyFilters}
					>
						Применить
					</Button>
				</Link>

				<Button
					className='w-full'
					size={'lg'}
					variant={'link'}
					onClick={resetFilters}
				>
					Сбросить фильтры
				</Button>
			</div>
		</div>
	)
}
