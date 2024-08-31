'use client'

import { ReactNode, useRef, useState } from 'react'

type Props = {
	text: ReactNode
	collapsed: ReactNode
}

export function CollapsedText(props: Props) {
	const { text, collapsed } = props

	const [hideMore, setHideMore] = useState(true)
	const textRef = useRef<HTMLDivElement>(null)

	const collapseText = () => {
		setHideMore(true)
		if (textRef.current) {
			textRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
			})
		}
	}

	return (
		<>
			<div
				ref={textRef}
				className={'prose-sm text-muted-foreground leading-tight'}
			>
				{text}
			</div>
			<div
				className={'text-sm hover:underline cursor-pointer'}
				style={{ display: !hideMore ? 'none' : 'block' }}
				onClick={() => setHideMore(prev => !prev)}
			>
				Читать далее
			</div>
			<div
				className={`mt-4 prose-sm text-muted-foreground leading-tight `}
				style={{ display: hideMore ? 'none' : 'block' }}
			>
				{collapsed}
			</div>
			<span
				className={'inline-block text-sm hover:underline cursor-pointer'}
				style={{ display: hideMore ? 'none' : 'block' }}
				onClick={collapseText}
			>
				Скрыть
			</span>
		</>
	)
}
