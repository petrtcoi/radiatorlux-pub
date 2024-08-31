'use client'

import { Button } from '@/components/ui/button'
import { TColor, TConnection } from '@/entities'
import { useAtom } from 'jotai/react'
import { useEffect } from 'react'
import { $filterColor, $filterConnection } from '../_store'
import { AllColorsDrawer } from './_AllColorsDrawer'
import { AllConnectionsDrawer } from './_AllConnectionsDrawer'
import { ColorOption } from './_ColorOption'
import { ConnectionOption } from './_ConnectionOption'

// ========== Types ====================

type Props = {
	connections: TConnection[]
	colors: TColor[]
	assetsPathColor: string
	assetsPathConnection: string
	initColor: TColor
	initConnection: TConnection
}

// ========== Component =============

export function ModelFilters(props: Props) {
	const { connections, colors, assetsPathColor, assetsPathConnection, initColor, initConnection } = props

	const [filterColor, setFilterColor] = useAtom($filterColor)
	const [filterConnection, setFilterConnection] = useAtom($filterConnection)

	useEffect(() => {
		setFilterColor(initColor)
	}, [initColor, setFilterColor])

	useEffect(() => {
		setFilterConnection(initConnection)
	}, [initConnection, setFilterConnection])

	const color = filterColor || initColor
	const connection = filterConnection || initConnection

	// --- Styles --------

	const filterHeaderStyle = 'text-sm font-semibold text-slate-900'

	// ========== Component =============

	return (
		<>
			<div className='flex flex-col sm:flex-row gap-4 sm:gap-20'>
				{/* Color */}

				<div
					className='cursor-pointer'
					// onClick={() => setOpenColorsDrawer(true)}
				>
					<div className={filterHeaderStyle}>
						Цвет <span className='font-light text-xs'>(всего вариантов {colors.length})</span>
					</div>
					<AllColorsDrawer
						colors={colors.sort((a, b) => (a.order || 0) - (b.order || 0))}
						assetsPath={assetsPathColor}
					>
						<div className='mt-1 sm:mt-2'>
							{color ? (
								<ColorOption
									setColor={setFilterColor}
									color={color}
									assetsPath={assetsPathColor}
								/>
							) : (
								<Button
									variant='secondary'
									size='sm'
									className='hover:opacity-75'
								>
									Выбрать цвет
								</Button>
							)}
						</div>
					</AllColorsDrawer>
				</div>

				{/* Connection */}

				<div className='cursor-pointer'>
					<div className={filterHeaderStyle}>
						Подключение <span className='font-light text-xs'>(всего вариантов {connections.length})</span>
					</div>
					<AllConnectionsDrawer
						connections={connections.sort((a, b) => (a.order || 0) - (b.order || 0))}
						assetsPath={assetsPathConnection}
					>
						<div className='mt-1 sm:mt-2'>
							{connection ? (
								<ConnectionOption
									setConnection={setFilterConnection}
									connection={connection}
									assetsPath={assetsPathConnection}
								/>
							) : (
								<Button
									variant='secondary'
									size='sm'
									className='hover:opacity-75'
								>
									Выбрать подключение
								</Button>
							)}
						</div>
					</AllConnectionsDrawer>
				</div>
			</div>
		</>
	)
}
