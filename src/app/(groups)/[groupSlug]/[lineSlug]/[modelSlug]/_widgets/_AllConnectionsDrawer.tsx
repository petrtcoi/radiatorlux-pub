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
import { TConnection } from '@/entities'
import { useAtom } from 'jotai'
import { ReactNode } from 'react'
import { $filterConnection } from '../_store'
import { ConnectionOption } from './_ConnectionOption'

type Props = {
	connections: TConnection[]
	assetsPath: string
	children: ReactNode
}

export function AllConnectionsDrawer(props: Props) {
	const { connections, assetsPath, children } = props

	const [filterConnection, setFilterConnection] = useAtom($filterConnection)

	const changeConnection = (connection: TConnection) => {
		setFilterConnection(connection)
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerContent className='max-h-[85svh] overflow-hidden ring-0'>
				<div className='max-h-screen overflow-y-scroll no-scrollbar'>
					<DrawerHeader>
						<DrawerTitle>Выберете подключение</DrawerTitle>
						<DrawerDescription className='text-xs max-w-[40rem]'>
							Данная модель может поставляться с различными типами подключения.
						</DrawerDescription>
						<div className='mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-start flex-wrap gap-x-6 gap-y-2 items-stretch'>
							{connections.map(conn => {
								const active = filterConnection?.slug === conn?.slug
								return (
									<DrawerClose key={conn?.slug}>
										<ConnectionOption
											active={active}
											setConnection={changeConnection}
											connection={conn}
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
