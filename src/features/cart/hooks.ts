'use client'

import { useAtom } from 'jotai'
import { $cart, CartItem } from './store'

export function useCart() {
	const [cart, setCart] = useAtom($cart)

	const reset = () => {
		setCart({ items: [] })
	}

	const add = (item: Omit<CartItem, 'qnty'>) => {
		const found = cart.items.find(
			i => i.radSlug === item.radSlug && i.connSlug === item.connSlug && i.colorSlug === item.colorSlug
		)
		if (found) {
			setCart({
				items: cart.items.map(i => (i === found ? { ...i, qnty: i.qnty + 1 } : i)),
			})
		} else {
			setCart({
				items: [...cart.items, { ...item, qnty: 1 }],
			})
		}
	}

	const remove = (item: Pick<CartItem, 'radSlug' | 'connSlug' | 'colorSlug'>) => {
		const found = cart.items.find(
			i => i.radSlug === item.radSlug && i.connSlug === item.connSlug && i.colorSlug === item.colorSlug
		)
		if (found) {
			if (found.qnty > 1) {
				setCart({
					items: cart.items.map(i => (i === found ? { ...i, qnty: i.qnty - 1 } : i)),
				})
			} else {
				setCart({
					items: cart.items.filter(i => i !== found),
				})
			}
		}
	}

	const getItem = (item: Pick<CartItem, 'radSlug' | 'connSlug' | 'colorSlug'>) => {
		const found = cart.items.find(
			i => i.radSlug === item.radSlug && i.connSlug === item.connSlug && i.colorSlug === item.colorSlug
		)
		return found || null
	}

	const getCartTotal = () => {
		return cart.items.reduce((acc, item) => acc + item.qnty * item.priceRub, 0)
	}

	return { cart, getCartTotal, add, remove, getItem, reset }
}
