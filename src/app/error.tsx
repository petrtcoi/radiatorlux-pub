'use client'
import { Placeholder } from '@/components'

// Error boundaries must be Client Components

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div className='flex flex-grow flex-1 h-full justify-center items-center'>
			<div className='flex flex-col justify-center items-center mt-[-10rem] max-w-[30rem] w-full'>
				{/* <h1 className='text-4xl font-bold'>Ошибка</h1> */}
				<Placeholder
					title={'Ошибка'}
					text={'Во время работы магазина произошла ошибка.'}
				/>
			</div>
		</div>
	)
}
