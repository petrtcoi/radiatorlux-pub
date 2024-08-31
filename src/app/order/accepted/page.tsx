import { MaxWidthWrapper, Placeholder } from '@/components'
import { Paths } from '@/configs'

export default async function CartPage() {
	return (
		<MaxWidthWrapper className={'mt-12 md:mt-24'}>
			<Placeholder
				title={'Заказ принят'}
				text={
					'Спасибо за заказ! Наш менеджер свяжется с вами в ближайшие рабочие часы для уточнения деталей: доставка, оплата, цвет и подключения радиаторов. '
				}
				url={Paths.home}
				urlText={'На главную'}
			/>
		</MaxWidthWrapper>
	)
}
