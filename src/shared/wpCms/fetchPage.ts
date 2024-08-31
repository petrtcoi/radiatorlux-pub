import { Revalidate } from '@/configs'
import { wpBaseUrlPages, WpPage } from './config'

type Props = {
	slug: string
	revalidate?: number | false
}

type Response = {
	page: WpPage | null
}

/**
 * Fetch page wp data by slug
 */
export async function fetchPage(props: Props): Promise<Response> {
	const { slug } = props

	const params: Record<string, string> = {
		slug: slug || '',
	}
	const searchParams = new URLSearchParams(params).toString()
	const response = await fetch(`${wpBaseUrlPages}?${searchParams}`, {
		next: { revalidate: Revalidate },
	})
	const pages = (await response.json()) as WpPage[]
	return { page: pages[0] || null }
}
