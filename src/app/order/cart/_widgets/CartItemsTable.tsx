'use client'

import { Placeholder } from '@/components'
import { Cart, useCart } from '@/features'
import { cn } from '@/shared'
import { CircleMinus, CirclePlus, ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'

// ---------- Constants ----------

const firstCol = 'pl-4'
const lastCol = 'pr-0'
const header = 'font-light py-2 text-left'
const rowStyle = 'py-4'

const hideOnMobile = 'hidden md:table-cell'
const showOnMobile = 'md:hidden'

// ---------- Component ----------

export function CartItemsTable() {
	const { cart, add, remove, getItem, getCartTotal } = useCart()

	const [initCart, setCart] = useState<Cart | null>(null)
	useEffect(() => {
		if (initCart !== null || cart.items.length === 0) return
		setCart(cart)
	}, [cart, initCart])

	if (initCart === null)
		return (
			<Placeholder
				className='mt-6'
				title={'Данные загружаются'}
				text={'Пожалуйста, подождите, идет загрузка данных о товарах в корзине.'}
			/>
		)

	if (!initCart.items.length) {
		return (
			<Placeholder
				className='mt-6'
				title={'Корзина пуста'}
				text={
					'Выберете нужные радиаторы или конвекторы отопления для оформления заказа. Или свяжитесь с нами для получения помощи в подборе.'
				}
			/>
		)
	}
	return (
		<div className='flex flex-col gap-2 mt-12 '>
			<table className='relative max-w-[50rem] m-auto'>
				<thead>
					<tr className='text-xs text-slate-600 border-b-[1px] border-b-slate-800'>
						<th
							className={cn(firstCol, header, 'text-left', 'w-full md:min-w-[18rem]')}
							scope='col'
						>
							Наименование
						</th>
						<th
							className={cn(header, hideOnMobile, 'text-center')}
							scope='col'
							style={{ minWidth: '8rem' }}
						>
							Цена, руб
						</th>
						<th
							className={cn(header, 'flex justify-center')}
							scope='col'
							style={{ minWidth: '8rem' }}
						>
							<ShoppingCart strokeWidth={1} />
						</th>
						<th
							className={cn(header, hideOnMobile, lastCol, 'text-center')}
							scope='col'
							style={{ minWidth: '8rem' }}
						>
							Сумма, руб
						</th>
					</tr>
				</thead>
				<tbody>
					{initCart.items.map(row => {
						const cartQnty = getItem({ ...row })?.qnty || 0
						const sum = row.priceRub * cartQnty

						return (
							<tr
								key={`${row.radSlug}-${row.connSlug}-${row.colorSlug}`}
								className='text-xs border-b-[1px] border-b-slate-300 hover:bg-slate-100'
							>
								<td className={cn(firstCol, rowStyle)}>
									<div className='flex flex-col gap-1'>
										<div className='font-semibold'>{row.title}</div>
										<div className='text-muted-foreground'>{row.colConn}</div>
										<div>{row.params}</div>
									</div>
								</td>
								<td className={cn(hideOnMobile, 'text-center ')}>{row.priceRub.toLocaleString('ru-RU')}</td>
								<td>
									<div
										className='flex flex-col gap-2 justify-center items-center'
										style={{ width: '8rem' }}
									>
										<div className={cn(showOnMobile, 'text-center text-muted-foreground')}>
											цена: {row.priceRub.toLocaleString('ru-RU')} руб.
										</div>
										<div className='flex flex-row gap-3 items-center'>
											<div
												onClick={() => {
													if (cartQnty <= 0) return
													remove({ ...row })
												}}
												className={cn(
													'flex flex-row justify-start items-center gap-1 text-primary hover:opacity-70 cursor-pointer',
													{
														'opacity-30 hover:opacity-30 hover:cursor-auto': cartQnty <= 0,
													}
												)}
											>
												<CircleMinus />
											</div>

											<div className='text-lg font-mono'>{cartQnty}</div>

											<div
												onClick={() => add({ ...row })}
												className='flex flex-row justify-start items-center gap-1 text-primary hover:opacity-70 cursor-pointer'
											>
												<CirclePlus />
											</div>
										</div>
										<div className={cn(showOnMobile, 'text-center text-muted-foreground')}>
											итого: {sum > 0 ? `${sum.toLocaleString('ru-RU')} руб.` : '-'}
										</div>
									</div>
								</td>
								<td className={cn(hideOnMobile, 'text-center', lastCol)}>
									{sum > 0 ? sum.toLocaleString('ru-RU') : '-'}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<div className='max-w-[50rem] m-auto w-full flex flex-row justify-end text-sm pr-3 items-baseline'>
				<span className='text-xs font-light mr-2'>итого:</span> {getCartTotal().toLocaleString('ru-RU')} руб.
			</div>
		</div>
	)
}
