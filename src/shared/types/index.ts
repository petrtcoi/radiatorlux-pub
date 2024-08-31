/**
 * Stats of fetched data
 */
export type Stats = {
	price: { min: number; max: number }
	length: { min: number; max: number }
	sections?: { min: number; max: number }
	heights: { min: number; max: number }
	dt70: { min: number; max: number }
}

export type PropsStat = {
	lengthMin: number
	lengthMax: number
	heightMin: number
	heightMax: number
	dt70Min: number
	dt70Max: number
	searchString: string
}
