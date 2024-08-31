import { Revalidate } from '@/configs'
import { connectToDb } from '@/shared'
import { unstable_cache } from 'next/cache'
import { Brand, Group, Line, Model, TBrand, TGroup, TLine, TModel } from '../models'

type TAllData = {
	models: TModel[]
	lines: TLine[]
	groups: TGroup[]
	brands: TBrand[]
}

async function _fetchAllData(): Promise<TAllData> {
	await connectToDb()
	const [models, lines, groups, brands] = await Promise.all([
		Model.find().lean<TModel[]>(),
		Line.find().lean<TLine[]>(),
		Group.find().lean<TGroup[]>(),
		Brand.find().lean<TBrand[]>(),
	])

	return JSON.parse(JSON.stringify({ models, lines, groups, brands }))
}

export type AllData = Awaited<ReturnType<typeof _fetchAllData>>

export const fetchAllData = unstable_cache(_fetchAllData, ['cache:all-data'], {
	tags: [`cache:all-data`],
	revalidate: Revalidate,
})
