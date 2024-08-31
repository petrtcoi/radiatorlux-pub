import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { cn, paginationGenerator } from '@/shared'

// ============================================================================

type Props = {
	limit: number
	page: number
	total: number

	pagesLength: number
	pagesPrev: number

	searchParams: any
	pathname: string
}

/** ================================
* Render
=================================== */
export function PaginationComponent(props: Props) {
	const { limit, page, total, pagesLength, pagesPrev, pathname, searchParams } =
		props

	const totalPages = Math.ceil(total / limit)

	const start = Math.max(page - pagesPrev, 1)
	const end = Math.min(start + pagesLength, totalPages)
	const pages = Array.from({ length: end - start + 1 }, (_, i) => i + start)

	const showFirst = start > 1
	const showEllipsisStart = start > 2
	const showLast = end < totalPages
	const showEllipsisEnd = end < totalPages - 1 && end !== totalPages

	const itemStyles = 'px-0 hover:bg-white hover:font-bold  font-normal border-0'
	const ellipsisStyles = 'px-0'

	const getLink = paginationGenerator({ pathname, searchParams })

	return (
		<Pagination className='justify-start'>
			<PaginationContent className='gap-0'>
				<PaginationItem>
					<PaginationPrevious
						href={getLink(page - 1)}
						className={itemStyles}
						isActive={page > 1}
					/>
				</PaginationItem>

				{showFirst && (
					<PaginationItem>
						<PaginationLink
							href={getLink(1)}
							className={itemStyles}
						>
							1
						</PaginationLink>
					</PaginationItem>
				)}
				{showEllipsisStart && (
					<PaginationItem>
						<PaginationEllipsis className={ellipsisStyles} />
					</PaginationItem>
				)}
				{pages.map(p => (
					<PaginationItem key={p}>
						<PaginationLink
							href={getLink(p)}
							isActive={p === page}
							className={cn(itemStyles, {
								['text-primary font-bold hover:text-primary']: p === page,
							})}
						>
							{p}
						</PaginationLink>
					</PaginationItem>
				))}
				{showEllipsisEnd && (
					<PaginationItem>
						<PaginationEllipsis className={ellipsisStyles} />
					</PaginationItem>
				)}
				{showLast && (
					<PaginationItem>
						<PaginationLink
							href={getLink(totalPages)}
							className={itemStyles}
						>
							{totalPages}
						</PaginationLink>
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationNext
						href={getLink(page + 1)}
						className={itemStyles}
						isActive={page < totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
