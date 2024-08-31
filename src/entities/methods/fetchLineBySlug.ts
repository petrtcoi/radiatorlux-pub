import { Revalidate } from '@/configs'
import { connectToDb } from '@/shared'
import { unstable_cache } from 'next/cache'
import { Line, TBrand, TLine } from '../models'

type Props = {
	slug: string
}
type GenProps = {
	slug: string
	revalidate?: number | false
}

export const fetchLineBySlug = async ({ slug }: Props) => {
	await connectToDb()
	const line = await Line.findOne({
		slug,
	})
		.populate({
			path: 'brand',
			select: 'name slug logo',
		})
		.lean<TLine & { brand: Pick<TBrand, 'name' | 'slug' | 'logo'> }>()
	return line
}

export const genFetchLineBySlugPromise = ({ slug, revalidate = 60 * 60 * 1 }: GenProps) =>
	unstable_cache(async () => fetchLineBySlug({ slug }), ['cache:group-by-slug', slug], {
		revalidate: Revalidate,
	})()
