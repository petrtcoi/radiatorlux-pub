import { Revalidate } from '@/configs'
import { unstable_cache } from 'next/cache'
import { Group, TGroup } from '../models'

type Props = {
	slug: string
}
type GenProps = {
	slug: string
	revalidate: number | false
}

export const fetchGroupBySlug = async ({ slug }: Props) => {
	const lines = (await Group.findOne({
		slug,
	}).lean()) as TGroup | null
	return lines
}

export const genFetchGroupBySlugPromise = ({ slug, revalidate = 60 * 60 * 1 }: GenProps) =>
	unstable_cache(async () => fetchGroupBySlug({ slug }), ['cache:group-by-slug', slug], {
		revalidate: Revalidate,
	})()
