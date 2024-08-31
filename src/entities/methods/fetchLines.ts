import { unstable_cache } from 'next/cache'
import { Line, TLine } from '../models'

type Props = {
	groupSlug?: string
}
type GenProps = {
	groupSlug: string
	revalidate: number | false
}

export const fetchLines = async ({ groupSlug }: Props) => {
	const lines = (await Line.find({
		groupSlug,
	}).lean()) as TLine[]
	return lines
}

export const genFetchLinesPromise = ({
	groupSlug,
	revalidate = 60 * 60 * 1,
}: GenProps) =>
	unstable_cache(
		async () => fetchLines({ groupSlug }),
		['cache:lines-by-group-slug', groupSlug],
		{ revalidate }
	)()
