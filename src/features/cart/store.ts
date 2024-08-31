'use client'

import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const LocalStorageVersion = process.env.NEXT_PUBLIC_LOCAL_STORAGE_VERSION || '0'
export const CartKey = `cart_v${LocalStorageVersion}`

export type CartItem = {
	radSlug: string
	connSlug: string
	colorSlug: string
	qnty: number

	title: string
	colConn: string
	params: string
	priceRub: number
}
export type Cart = {
	items: CartItem[]
}

const storage = createJSONStorage(() => sessionStorage)

export const $cart = atomWithStorage<Cart>(CartKey, { items: [] })
