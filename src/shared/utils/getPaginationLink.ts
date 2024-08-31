type PaginationProps = {
	pathname: string
	searchParams: any
	page: number
}

export function getPaginationLink(props: PaginationProps): string {
	const { pathname, searchParams, page } = props

	const params = new URLSearchParams(searchParams)
	params.set('page', String(page))
	return `${pathname}?${params.toString()}`
}

export function paginationGenerator(
	props: Omit<PaginationProps, 'page'>
): (x: number) => string {
	const { pathname, searchParams } = props

	return (page: number) => getPaginationLink({ pathname, searchParams, page })
}
