import { unstable_noStore as noStore } from 'next/cache'

export function Copyright() {
	noStore()
	const year = new Date().getFullYear()

	return (
		<div className='flex justify-center mt-14 m-auto font-light text-xs text-slate-100'>
			© {year} RadiatorLux.ru
		</div>
	)
}
