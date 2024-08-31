'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Paths } from '@/configs'
import { useCart } from '@/features'
import { sendOrderConfirmation } from '@/features/sendConfirmationEmail'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// ============= Constants =============

const formSchema = z.object({
	name: z.string().min(1, {
		message: 'Пожалуйста, введите имя',
	}),
	city: z.string().min(1, {
		message: 'Пожалуйста, введите город',
	}),
	phone: z.string().min(1, { message: 'Пожалуйста, введите телефон' }),
	email: z.string().or(z.literal('')),
	comment: z.string(),
})

// ============= Component =============

export function OrderForm() {
	const [fetching, setFetching] = useState(false)
	const [error, setError] = useState<string>('')
	const { cart, reset } = useCart()
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			city: '',
			phone: '',
			email: '',
			comment: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setError('')
		setFetching(true)
		const result = await sendOrderConfirmation({
			items: cart.items,
			formData: values,
		})
		setFetching(false)

		if (result === 'error') {
			setError('Во время отправки запроса произошла ошибка')
			return
		}

		form.reset()
		reset()
		router.push(Paths.order.success)
	}

	// ============= Render =============

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem aria-required>
							<FormLabel>
								Как к вам можно обращаться<sup>*</sup>
							</FormLabel>
							<FormControl>
								<Input
									style={{ marginTop: '0px' }}
									placeholder=''
									{...field}
								/>
							</FormControl>
							{/* <FormDescription>Описание</FormDescription> */}
							<FormMessage className='text-xs absolute' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='city'
					render={({ field }) => (
						<FormItem aria-required>
							<FormLabel>
								В каком городе требуется доставка<sup>*</sup>
							</FormLabel>
							<FormControl>
								<Input
									style={{ marginTop: '0px' }}
									placeholder=''
									{...field}
								/>
							</FormControl>
							<FormMessage className='text-xs' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem aria-required>
							<FormLabel>
								Телефон<sup>*</sup>
							</FormLabel>
							<FormControl>
								<Input
									style={{ marginTop: '0px' }}
									placeholder=''
									{...field}
								/>
							</FormControl>
							<FormMessage className='text-xs' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem aria-required>
							<FormLabel>Адрес электронной почты</FormLabel>
							<FormControl>
								<Input
									style={{ marginTop: '0px' }}
									placeholder=''
									{...field}
								/>
							</FormControl>
							<FormMessage className='text-xs' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='comment'
					render={({ field }) => (
						<FormItem aria-required>
							<FormLabel>Комментарий к заказу</FormLabel>
							<FormControl>
								<Textarea
									style={{ marginTop: '0px' }}
									placeholder=''
									{...field}
								/>
							</FormControl>
							<FormMessage className='text-xs' />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					disabled={fetching}
				>
					Отправить запрос
				</Button>
			</form>
			{error && <div className='text-red-500 text-sm mt-2'>{error}</div>}
		</Form>
	)
}
