import { MaxWidthWrapper } from '@/components'
import { Revalidate } from '@/configs'
import { fetchPage } from '@/shared'
import { unstable_cache } from 'next/cache'

async function OfertaPage() {
	const { page: pageData } = await unstable_cache(
		async () => await fetchPage({ slug: 'oferta' }),
		['cache:page', 'oferta'],
		{
			revalidate: Revalidate,
		}
	)()

	if (!pageData) throw new Error('OfertaPage not found')

	const rawHTML = pageData.content.rendered

	return (
		<MaxWidthWrapper>
			<div
				className='prose-sm pt-10 pb-16'
				dangerouslySetInnerHTML={{ __html: rawHTML }}
			/>
		</MaxWidthWrapper>
	)
}

export default OfertaPage
