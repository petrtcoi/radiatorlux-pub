import { MaxWidthWrapper } from '@/components'
import { CartItemsTable, OrderForm } from './_widgets'

export default async function CartPage() {
	return (
		<MaxWidthWrapper className={'mt-4 md:mt-16 pb-24'}>
			<h1 className='text-3xl text-left max-w-[30rem]  font-bold tracking-tight text-sate-900 sm:text-4xl '>
				Корзина покупок
			</h1>
			<div className='mt-2 max-w-[40rem] text-muted-foreground text-sm'>
				После оформления заказа наши свяжутся с вами в ближайшие рабочие часы для уточнения деталей: доставка, оплата,
				цвет и подключения радиаторов. Желательно проверить заказ с ответственным за ремонт лицом. Мы можем представить
				схему и всю необходимую техническую документацию.{' '}
				<span className='text-slate-900'>Размер скидки считается индивидуально</span>, исходя из суммы согласованного
				заказа.
			</div>

			<CartItemsTable />

			<div className='relative mt-24 w-full max-w-[50rem] m-auto '>
				<OrderForm />
			</div>
		</MaxWidthWrapper>
	)
}
