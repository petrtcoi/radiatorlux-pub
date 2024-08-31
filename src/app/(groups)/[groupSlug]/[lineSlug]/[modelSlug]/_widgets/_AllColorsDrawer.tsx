import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { TColor } from '@/entities'
import { useAtom } from 'jotai'
import { ReactNode } from 'react'
import { $filterColor } from '../_store'
import { ColorOption } from './_ColorOption'

type Props = {
	colors: TColor[]
	assetsPath: string
	children: ReactNode
}

export function AllColorsDrawer(props: Props) {
	const { colors, assetsPath, children } = props

	const [filterColor, setFilterColor] = useAtom($filterColor)

	const changeColor = (color: TColor) => {
		setFilterColor(color)
	}

	return (
		<Drawer disablePreventScroll={true}>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className='max-h-[85svh] overflow-hidden'>
				<div className='max-h-screen overflow-y-scroll no-scrollbar'>
					<DrawerHeader>
						<DrawerTitle>Выберете цвет 2</DrawerTitle>
						<DrawerDescription className='text-xs max-w-[40rem]'>
							Цвет на экране отличается от реального. Не ориентируйтесь на него. Реальное восприятие цвета зависит как
							от текстуры поверхности, так и от условий освещенности.
						</DrawerDescription>
						<div className='mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-start flex-wrap gap-x-6 gap-y-2 items-stretch'>
							{colors.map(color => {
								const active = filterColor?.slug === color?.slug
								return (
									<DrawerClose key={color?.slug}>
										<ColorOption
											active={active}
											setColor={changeColor}
											color={color}
											assetsPath={assetsPath}
										/>
									</DrawerClose>
								)
							})}
						</div>
					</DrawerHeader>
					<DrawerFooter>
						<DrawerClose>
							<Button variant='outline'>Закрыть</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
