import { WpMedia } from './config'

type Props = {
	url: string
	revalidate?: number | false
}

type Response = {
	media: WpMedia
}

export async function fetchMedia(props: Props): Promise<Response> {
	const { url, revalidate = 60 * 60 * 24 } = props
	const response = await fetch(url, {
		next: { revalidate },
	})

	const media = (await response.json()) as WpMedia
	return { media }
}
