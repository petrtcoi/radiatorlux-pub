import { PropsStat, Stats } from '@/shared'
import { FilterBlockValues, FiltersBlockData } from './FiltersBlock'

// ============================================================================

const FilterKeys = ['height', 'length', 'dt70'] as const

export function getFilterLink(props: { filtersData: FilterBlockValues; searchParams: any; pathname: string }): string {
	const { searchParams, pathname, filtersData: filters } = props

	const search = new URLSearchParams(searchParams)

	for (const key of FilterKeys) {
		if (!filters[key][0]) continue
		search.set(`${key}gte`, filters[key][0].toString())
		search.set(`${key}lte`, filters[key][1].toString())
	}

	search.set('page', '1')

	return `${pathname}?${search.toString()}`
}

// ============================================================================

export function statsToFiltersData({ stats, props }: { stats: Stats; props: Partial<PropsStat> }): FiltersBlockData {
	return {
		height: {
			title: 'Высота',
			min: stats.heights.min,
			max: stats.heights.max,
			unit: 'мм',
			initValues: [
				props.heightMin ? Math.max(stats.heights.min, props.heightMin) : stats.heights.min,
				props.heightMax ? Math.min(stats.heights.max, props.heightMax) : stats.heights.max,
			],
		},
		length: {
			title: 'Ширина',
			min: stats.length.min,
			max: stats.length.max,
			unit: 'мм',
			initValues: [
				props.lengthMin ? Math.max(stats.length.min, props.lengthMin) : stats.length.min,
				props.lengthMax ? Math.min(stats.length.max, props.lengthMax) : stats.length.max,
			],
		},
		dt70: {
			title: 'Мощность (Δ70)',
			min: stats.dt70.min,
			max: stats.dt70.max,
			unit: 'Вт',
			initValues: [
				props.dt70Min ? Math.max(stats.dt70.min, props.dt70Min) : stats.dt70.min,
				props.dt70Max ? Math.min(stats.dt70.max, props.dt70Max) : stats.dt70.max,
			],
		},
	}
}
