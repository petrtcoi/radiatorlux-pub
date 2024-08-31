import { wpCategories, WpPost } from './config'

export function sortPostsByDateDescending(a: WpPost, b: WpPost): number {
	const dateA = new Date(a.date).getTime()
	const dateB = new Date(b.date).getTime()
	return dateB - dateA
}

export function stripHtmlTags(str: string): string {
	return str.replace(/<\/?[^>]+(>|$)/g, '')
}
